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

            var token = Environment.GetEnvironmentVariable("VERCEL_TOKEN");
            if (string.IsNullOrEmpty(token))
            {
                Log.LogWarning($"{this.GetType().Name} will not execute this time, VERCEL_TOKEN is not configured");
                return;
			}

            var cm = Environment.GetEnvironmentVariable("PUBLIC_HOST_CM");
            var ns = Environment.GetEnvironmentVariable("RELEASE_NAMESPACE");
            var js = Environment.GetEnvironmentVariable("SITECORE_JSS_EDITING_SECRET");
            var sourceDirectory = "C:\\app\\rendering";
            var targetDirectory = $"C:\\app\\rendering-{ns}";

            // Needed to ensure that Vercel project has unique name per namespace
            Directory.Move(sourceDirectory, targetDirectory);

            var cmd = new WindowsCommandLine(targetDirectory);

            cmd.Run($"vercel link --confirm --token {token} --debug");

            // Hack until domain mgmt. clarified
            var whoami = cmd.Run($"vercel whoami --token {token}").Split(Environment.NewLine)[4].Trim();
            var productionUrl = $"https://rendering-{ns}-{whoami}.vercel.app";
            cmd.Run($"echo | set /p={productionUrl}| vercel env add PUBLIC_URL production --token {token}");

            // Configure env. variables
            cmd.Run($"echo {cm} | vercel env add SITECORE_API_HOST production --token {token}");
            cmd.Run($"echo {SitecoreApiKey} | vercel env add SITECORE_API_KEY production --token {token}");
            cmd.Run($"echo {js} | vercel env add JSS_EDITING_SECRET production --token {token}");

            // Deploy project files
            var response = cmd.Run($"vercel --confirm --debug --prod --no-clipboard --token {token} --env SITECORE_API_HOST={cm} --env SITECORE_API_KEY={SitecoreApiKey}");
            Console.WriteLine($"Log lines: { response.Split(Environment.NewLine).Length}");

            await Complete();
        }
	}
}
