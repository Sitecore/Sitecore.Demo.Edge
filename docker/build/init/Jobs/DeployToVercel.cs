using System;
using System.Diagnostics;
using System.Threading.Tasks;

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

			var cmd = new Process();
            cmd.StartInfo.FileName = "cmd.exe";
            cmd.StartInfo.RedirectStandardInput = true;
            cmd.StartInfo.RedirectStandardOutput = true;
            cmd.StartInfo.CreateNoWindow = true;
            cmd.StartInfo.UseShellExecute = false;
            cmd.StartInfo.WorkingDirectory = "C:\\website";
            cmd.Start();

            cmd.StandardInput.WriteLine($"vercel --confirm --prod --token {token}");
            cmd.StandardInput.Flush();
            cmd.StandardInput.Close();
            cmd.WaitForExit();
            Console.WriteLine(cmd.StandardOutput.ReadToEnd());

			await Complete();
		}
	}
}
