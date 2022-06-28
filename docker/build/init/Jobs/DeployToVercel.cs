using System;
using System.IO;
using System.Threading.Tasks;
using Sitecore.Demo.Init.Container;

namespace Sitecore.Demo.Init.Jobs
{
    using Microsoft.Extensions.Logging;

    class DeployToVercel : TaskBase
    {
        private const string SitecoreApiKey = "{1047AEE5-9BCD-4DBF-9744-A26E12B79AB6}";
        private const string ErrorText = "Error! Check your logs";
        private const string DefaultVercelRegion = "cle1";

        public DeployToVercel(InitContext initContext)
            : base(initContext)
        {
        }

        public async Task Run()
        {
            var ns = Environment.GetEnvironmentVariable("RELEASE_NAMESPACE");
            if (string.IsNullOrEmpty(ns))
            {
                Log.LogWarning(
                    $"{this.GetType().Name} will not execute this time, RELEASE_NAMESPACE is not configured - this job is only required on AKS");
                return;
            }

            var token = Environment.GetEnvironmentVariable("VERCEL_TOKEN");
            if (string.IsNullOrEmpty(token))
            {
                Log.LogWarning($"{this.GetType().Name} will not execute this time, VERCEL_TOKEN is not configured");
                return;
            }

            var scope = Environment.GetEnvironmentVariable("VERCEL_SCOPE");
            if (string.IsNullOrEmpty(token))
            {
                Log.LogWarning($"{this.GetType().Name} will not execute this time, VERCEL_SCOPE is not configured");
                return;
            }

            var region = Environment.GetEnvironmentVariable("VERCEL_REGION");
            if (string.IsNullOrEmpty(region))
            {
                region = DefaultVercelRegion;
            }

            var cmpEndpointUrl = Environment.GetEnvironmentVariable("CMP_PREVIEW_ENDPOINT_URL");
            if (string.IsNullOrEmpty(cmpEndpointUrl))
            {
                Log.LogWarning(
                    $"{this.GetType().Name} will not execute this time, CMP_PREVIEW_ENDPOINT_URL is not configured");
                return;
            }

            var cmpApiKey = Environment.GetEnvironmentVariable("CMP_PREVIEW_API_KEY");
            if (string.IsNullOrEmpty(cmpApiKey))
            {
                Log.LogWarning(
                    $"{this.GetType().Name} will not execute this time, CMP_PREVIEW_API_KEY is not configured");
                return;
            }

            var cdpClientKey = Environment.GetEnvironmentVariable("CDP_CLIENT_KEY");
            var cdpApiTargetEndpoint = Environment.GetEnvironmentVariable("CDP_API_TARGET_ENDPOINT");
            var cdpProxyUrl = Environment.GetEnvironmentVariable("CDP_PROXY_URL");

            Task tv = Task.Factory.StartNew(() => DeployTv(ns, cmpEndpointUrl, cmpApiKey, token, scope, region));
            Task website = Task.Factory.StartNew(() =>
                DeployWebsite(ns, cdpClientKey, cdpApiTargetEndpoint, cdpProxyUrl, token, scope, region));
            Task kiosk = Task.Factory.StartNew(() => DeployKiosk(ns, cdpClientKey, cdpApiTargetEndpoint, cdpProxyUrl,
                cmpEndpointUrl, cmpApiKey, token, scope, region));
            Task.WaitAll(tv, website, kiosk);

            Log.LogInformation($"{this.GetType().Name} task complete");
            await Complete();
        }

        private static void DeployTv(string ns, string cmpEndpointUrl, string cmpApiKey, string token, string scope, string region)
        {
            var sourceDirectory = "C:\\app\\tv";
            var targetDirectory = $"C:\\app\\{ns}-tv";

            // Needed to ensure that Vercel project has unique name per namespace
            Directory.Move(sourceDirectory, targetDirectory);

            var cmd = new WindowsCommandLine(targetDirectory);

            // Remove project if already exists
            cmd.Run($"vercel remove {ns}-tv --token {token} --scope {scope} --yes");

            // Create new project
            cmd.Run($"vercel link --confirm --token {token} --debug --scope {scope}");

            // Configure env. variables
            cmd.Run(
                $"echo | set /p=\"{cmpEndpointUrl}\" | vercel env add NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{cmpApiKey}\" | vercel env add NEXT_PUBLIC_CMP_PREVIEW_API_KEY production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"https://{ns}-website.sitecoredemo.com\" | vercel env add NEXT_PUBLIC_WEBSITE_URL production --token {token} --scope {scope}");

            // Deploy project files
            var output = cmd.Run($"vercel --confirm --debug --prod --no-clipboard --token {token} --scope {scope} --regions {region}");
            if (output.Contains(ErrorText))
            {
                throw new Exception($"An error has occurred when running DeployToVercel job: DeployTv");
            }

            // Assign custom domain name
            cmd.Run($"vercel domains add {ns}-tv.sitecoredemo.com --token {token} --scope {scope}");
        }

        private static void DeployWebsite(string ns, string cdpClientKey, string cdpApiTargetEndpoint,
            string cdpProxyUrl, string token, string scope, string region)
        {
            // General
            var cm = Environment.GetEnvironmentVariable("PUBLIC_HOST_CM");
            var js = Environment.GetEnvironmentVariable("SITECORE_JSS_EDITING_SECRET");

            var sourceDirectory = "C:\\app\\rendering";
            var targetDirectory = $"C:\\app\\{ns}-website";

            // Needed to ensure that Vercel project has unique name per namespace
            Directory.Move(sourceDirectory, targetDirectory);

            var cmd = new WindowsCommandLine(targetDirectory);

            // Remove project if already exists
            cmd.Run($"vercel remove {ns}-website --token {token} --scope {scope} --yes");

            // Create new project
            cmd.Run($"vercel link --confirm --token {token} --debug --scope {scope}");
            var productionUrl = $"https://{ns}-website-{scope}.vercel.app";

            // Configure env. variables

            // General
            cmd.Run(
                $"echo | set /p=\"{productionUrl}\" | vercel env add PUBLIC_URL production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{cm}\" | vercel env add SITECORE_API_HOST production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{SitecoreApiKey}\" | vercel env add SITECORE_API_KEY production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{js}\" | vercel env add JSS_EDITING_SECRET production --token {token} --scope {scope}");

            // CDP
            cmd.Run(
                $"echo | set /p=\"{cdpClientKey}\" | vercel env add NEXT_PUBLIC_CDP_CLIENT_KEY production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{cdpApiTargetEndpoint}\" | vercel env add NEXT_PUBLIC_CDP_API_TARGET_ENDPOINT production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{cdpProxyUrl}\" | vercel env add NEXT_PUBLIC_CDP_PROXY_URL production --token {token} --scope {scope}");

            // Deploy project files
            var output = cmd.Run($"vercel --confirm --debug --prod --no-clipboard --token {token} --scope {scope} --regions {region}");
            if (output.Contains(ErrorText))
            {
                throw new Exception($"An error has occurred when running DeployToVercel job: DeployWebsite");
            }

            // Assign custom domain name
            cmd.Run($"vercel domains add {ns}-website.sitecoredemo.com --token {token} --scope {scope}");
        }

        private static void DeployKiosk(string ns, string cdpClientKey, string cdpApiTargetEndpoint, string cdpProxyUrl,
            string cmpEndpointUrl, string cmpApiKey, string token, string scope, string region)
        {
            var sourceDirectory = "C:\\app\\kiosk";
            var targetDirectory = $"C:\\app\\{ns}-kiosk";

            // Needed to ensure that Vercel project has unique name per namespace
            Directory.Move(sourceDirectory, targetDirectory);

            var cmd = new WindowsCommandLine(targetDirectory);

            // Remove project if already exists
            cmd.Run($"vercel remove {ns}-kiosk --token {token} --scope {scope} --yes");

            // Create new project
            cmd.Run($"vercel link --confirm --token {token} --debug --scope {scope}");

            // Configure env. variables
            cmd.Run(
                $"echo | set /p=\"{cdpClientKey}\" | vercel env add NEXT_PUBLIC_CDP_CLIENT_KEY production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{cdpApiTargetEndpoint}\" | vercel env add NEXT_PUBLIC_CDP_API_TARGET_ENDPOINT production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{cdpProxyUrl}\" | vercel env add NEXT_PUBLIC_CDP_PROXY_URL production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"https://{ns}-website.sitecoredemo.com\" | vercel env add NEXT_PUBLIC_WEBSITE_URL production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{cmpEndpointUrl}\" | vercel env add NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{cmpApiKey}\" | vercel env add NEXT_PUBLIC_CMP_PREVIEW_API_KEY production --token {token} --scope {scope}");

            // Deploy project files
            var output = cmd.Run($"vercel --confirm --debug --prod --no-clipboard --token {token} --scope {scope} --regions {region}");
            if (output.Contains(ErrorText))
            {
                throw new Exception($"An error has occurred when running DeployToVercel job: DeployKiosk");
            }

            // Assign custom domain name
            cmd.Run($"vercel domains add {ns}-kiosks.sitecoredemo.com --token {token} --scope {scope}");
        }
    }
}