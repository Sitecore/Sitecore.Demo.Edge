﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Sitecore.Demo.Init.Extensions;
using Sitecore.Demo.Init.Jobs;
using Sitecore.Demo.Init.Model;

namespace Sitecore.Demo.Init.Services
{

	public sealed class JobManagementManagementService : BackgroundService, IJobManagementService
	{
		private readonly ILogger<JobManagementManagementService> logger;
		private readonly InitContext initContext;
		private readonly IStateService stateService;

		public JobManagementManagementService(ILoggerFactory logFactory, ILogger<JobManagementManagementService> logger, InitContext initContext, IStateService stateService)
		{
			ApplicationLogging.LoggerFactory = logFactory;
			this.logger = logger;
			this.initContext = initContext;
			this.stateService = stateService;
		}

		protected override async Task ExecuteAsync(CancellationToken stoppingToken)
		{
            try
            {
                var startTime = DateTime.UtcNow;
                logger.LogInformation($"{DateTime.UtcNow} Init started.");
                await stateService.SetState(InstanceState.Initializing);
                await new WaitForContextDatabase(initContext).Run();
                await new RestartCM(initContext).Run();
                await new WaitForSitecoreToStart(initContext).Run();
                await new PopulateManagedSchema(initContext).Run();
                await stateService.SetState(InstanceState.WarmingUp);
                await new PushSerialized(initContext).Run();
                await new WarmupCM(initContext).Run();
                await new DeployToVercel(initContext).Run();
                await stateService.SetState(InstanceState.Preparing);

                var indexRebuildAsyncJob = new IndexRebuild(initContext);
                await indexRebuildAsyncJob.Run();

                logger.LogInformation(
                    $"{DateTime.UtcNow} All init tasks complete. See the background jobs status below.");
                logger.LogInformation($"Elapsed time: {(DateTime.UtcNow - startTime):c}");

                var asyncJobList = new List<TaskBase>
                {
                    indexRebuildAsyncJob,
                };

                var runningJobs = await JobStatus.Run();
                while (runningJobs.Any(x => x.Title == indexRebuildAsyncJob.TaskName))
                {
                    var completedJobs = asyncJobList.Where(
                        asyncJob => runningJobs.All(runningJob => runningJob.Title != asyncJob.TaskName)).ToList();
                    foreach (var completedJob in completedJobs)
                    {
                        logger.LogInformation($"Writing job complete file to disk - {completedJob.TaskName}");
                        await completedJob.Complete();
                        asyncJobList.Remove(completedJob);
                    }

                    await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
                    runningJobs = await JobStatus.Run();
                }

                if (asyncJobList.Any())
                {
                    foreach (var job in asyncJobList)
                    {
                        logger.LogInformation($"Writing job complete file to disk - {job.TaskName}");
                        await job.Complete();
                    }
                }

                logger.LogInformation($"{DateTime.UtcNow} No jobs are running. Monitoring stopped.");
                await stateService.SetState(InstanceState.Ready);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error has occurred when running JobManagementManagementService");
            }
        }
	}
}
