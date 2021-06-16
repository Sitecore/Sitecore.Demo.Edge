using System;
using System.Threading.Tasks;
using Sitecore.Demo.Init.Container;

namespace Sitecore.Demo.Init.Jobs
{
	using Microsoft.Extensions.Logging;

	class DeployToVercel : TaskBase
	{
		public DeployToVercel(InitContext initContext)
			: base(initContext)
		{
		}

		public async Task Run()
		{
            //if (this.IsCompleted())
            //{
            //    Log.LogWarning($"{this.GetType().Name} is already complete, it will not execute this time");
            //    return;
            //}

            var token = Environment.GetEnvironmentVariable("VERCEL_TOKEN");
            if (string.IsNullOrEmpty(token))
            {
                Log.LogWarning($"{this.GetType().Name} will not execute this time, VERCEL_TOKEN is not configured");
                return;
			}

            var cm = Environment.GetEnvironmentVariable("PUBLIC_HOST_CM");
            var cmd = new WindowsCommandLine("C:\\app\\rendering");

            // Deploy project files & configure env. variables
            cmd.Run($"vercel --confirm --debug --prod --no-clipboard --token {token} --env SITECORE_API_HOST={cm} --env SITECORE_API_KEY={{1047AEE5-9BCD-4DBF-9744-A26E12B79AB6}} --env TEST=TEST");

            await Complete();
		}
	}
}
