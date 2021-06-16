﻿using System;
using System.Linq;
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

            cmd.Run($"vercel link --confirm  --token {token}");

            // Configure env. variables
            cmd.Run($"echo {cm} | vercel env add SITECORE_API_HOST production --token {token}");
            cmd.Run($"echo {{1047AEE5-9BCD-4DBF-9744-A26E12B79AB6}} | vercel env add SITECORE_API_KEY production --token {token}");
            cmd.Run($"echo 7QF3bkaKFD2EdFHqluHeRbi6ZjoQYXqQUrgonMQfdEwFqDHjY7Z55oaxeMRAFqHY | vercel env add JSS_EDITING_SECRET production --token {token}");

            // Deploy project files
            var response = cmd.Run($"vercel --confirm --debug --prod --no-clipboard --token {token} --env SITECORE_API_HOST={cm} --env SITECORE_API_KEY={{1047AEE5-9BCD-4DBF-9744-A26E12B79AB6}}");
            Console.WriteLine($"Log lines: { response.Split(Environment.NewLine).Length}");
            var productionUrl = response.Split(Environment.NewLine).FirstOrDefault(x => x.StartsWith("Production:"));
            if (!string.IsNullOrEmpty(productionUrl))
            {
                Console.WriteLine($"Production Url string: {productionUrl}");
                productionUrl = productionUrl.Split(" ")[1].Trim();
            }

            cmd.Run($"echo {productionUrl} | vercel env add PUBLIC_URL production --token {token}");

            await Complete();
		}
	}
}
