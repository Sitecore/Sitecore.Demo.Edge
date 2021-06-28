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

        public DeployToVercel(InitContext initContext)
            : base(initContext)
        {
        }

        public async Task Run()
        {
            if (this.IsCompleted())
            {
                Log.LogWarning($"{this.GetType().Name} is already complete, it will not execute this time");
                return;
            }

            var ns = Environment.GetEnvironmentVariable("RELEASE_NAMESPACE");
            if (string.IsNullOrEmpty(ns))
            {
                Log.LogWarning($"{this.GetType().Name} will not execute this time, RELEASE_NAMESPACE is not configured - this job is only required on AKS");
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

            var cm = Environment.GetEnvironmentVariable("PUBLIC_HOST_CM");
            var ns = Environment.GetEnvironmentVariable("RELEASE_NAMESPACE");
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
            cmd.Run($"echo | set /p=\"{productionUrl}\" | vercel env add PUBLIC_URL production --token {token} --scope {scope}");
            cmd.Run($"echo | set /p=\"{cm}\" | vercel env add SITECORE_API_HOST production --token {token} --scope {scope}");
            cmd.Run($"echo | set /p=\"{SitecoreApiKey}\" | vercel env add SITECORE_API_KEY production --token {token} --scope {scope}");
            cmd.Run($"echo | set /p=\"{js}\" | vercel env add JSS_EDITING_SECRET production --token {token} --scope {scope}");

            // Deploy project files
            cmd.Run($"vercel --confirm --debug --prod --no-clipboard --token {token} --scope {scope}");

            // Assign custom domain name
            cmd.Run($"vercel domains add {ns}-website.sitecoredemo.com --token {token} --scope {scope}");

            await Complete();
        }
    }
}