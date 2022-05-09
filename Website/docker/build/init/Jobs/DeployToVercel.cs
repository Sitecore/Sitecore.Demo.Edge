﻿using System;
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

            Task website = Task.Factory.StartNew(() =>
                DeployWebsite(ns, cdpClientKey, cdpApiTargetEndpoint, cdpProxyUrl, token, scope, region));
            Task.WaitAll(website);

            Log.LogInformation($"{this.GetType().Name} task complete");
            await Complete();
        }

        private static void DeployWebsite(string ns, string cdpClientKey, string cdpApiTargetEndpoint,
            string cdpProxyUrl, string token, string scope, string region)
        {
            var cm = Environment.GetEnvironmentVariable("PUBLIC_HOST_CM");
            var js = Environment.GetEnvironmentVariable("SITECORE_JSS_EDITING_SECRET");
            var discoverCustomerKey = Environment.GetEnvironmentVariable("DISCOVER_CUSTOMER_KEY");
            var discoverApiKey = Environment.GetEnvironmentVariable("DISCOVER_API_KEY");
            var orderCloudBuyerClientId = Environment.GetEnvironmentVariable("ORDERCLOUD_BUYER_CLIENT_ID");
            var orderCloudBaseApiUrl = Environment.GetEnvironmentVariable("ORDERCLOUD_BASE_API_URL");
            var orderCloudMiddlewareClientId = Environment.GetEnvironmentVariable("ORDERCLOUD_MIDDLEWARE_CLIENT_ID");
            var orderCloudMiddlewareClientSecret = Environment.GetEnvironmentVariable("ORDERCLOUD_MIDDLEWARE_CLIENT_SECRET");
            var orderCloudMiddlewareAllowedClientIds = Environment.GetEnvironmentVariable("ORDERCLOUD_MIDDLEWARE_ALLOWED_CLIENTIDS");
            var orderCloudWebhookHashKey = Environment.GetEnvironmentVariable("ORDERCLOUD_WEBHOOK_HASH_KEY");
            var npmrcFileContents = Environment.GetEnvironmentVariable("NPMRC");
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
            cmd.Run(
                $"echo | set /p=\"{productionUrl}\" | vercel env add PUBLIC_URL production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{cm}\" | vercel env add SITECORE_API_HOST production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{SitecoreApiKey}\" | vercel env add SITECORE_API_KEY production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{js}\" | vercel env add JSS_EDITING_SECRET production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{cdpClientKey}\" | vercel env add NEXT_PUBLIC_CDP_CLIENT_KEY production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{cdpApiTargetEndpoint}\" | vercel env add NEXT_PUBLIC_CDP_API_TARGET_ENDPOINT production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{cdpProxyUrl}\" | vercel env add NEXT_PUBLIC_CDP_PROXY_URL production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{discoverCustomerKey}\" | vercel env add NEXT_PUBLIC_DISCOVER_CUSTOMER_KEY production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{discoverApiKey}\" | vercel env add NEXT_PUBLIC_DISCOVER_API_KEY production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{orderCloudBuyerClientId}\" | vercel env add NEXT_PUBLIC_ORDERCLOUD_BUYER_CLIENT_ID production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{orderCloudBaseApiUrl}\" | vercel env add NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{orderCloudMiddlewareClientId}\" | vercel env add ORDERCLOUD_MIDDLEWARE_CLIENT_ID production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{orderCloudMiddlewareClientSecret}\" | vercel env add ORDERCLOUD_MIDDLEWARE_CLIENT_SECRET production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{orderCloudMiddlewareAllowedClientIds}\" | vercel env add ORDERCLOUD_MIDDLEWARE_ALLOWED_CLIENTIDS production --token {token} --scope {scope}");
            cmd.Run(
                $"echo | set /p=\"{orderCloudWebhookHashKey}\" | vercel env add OC_WEBHOOK_HASH_KEY production --token {token} --scope {scope}");

            // Configure special NPM_RC environment variable for the internal NPM registries. https://vercel.com/support/articles/using-private-dependencies-with-vercel
            cmd.Run(
                $"echo | set /p=\"{npmrcFileContents}\" | vercel env add NPM_RC production --token {token} --scope {scope}");

            // Deploy project files
            var output = cmd.Run($"vercel --confirm --debug --prod --no-clipboard --token {token} --scope {scope} --regions {region}");
            if (output.Contains(ErrorText))
            {
                throw new Exception($"An error has occurred when running DeployToVercel job: DeployWebsite");
            }

            // Assign custom domain name
            cmd.Run($"vercel domains add {ns}-website.sitecoredemo.com --token {token} --scope {scope}");
        }
    }
}