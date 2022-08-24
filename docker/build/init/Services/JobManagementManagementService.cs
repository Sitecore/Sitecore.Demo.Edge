using System;
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

        public JobManagementManagementService(ILoggerFactory logFactory, ILogger<JobManagementManagementService> logger,
            InitContext initContext, IStateService stateService)
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
                logger.LogInformation($"{DateTime.UtcNow} Init started.");
                await stateService.SetState(InstanceState.Initializing);
                await new WaitForContextDatabase(initContext).Run();
                await new WaitForSitecoreToStart(initContext).Run();
                await new PopulateManagedSchema(initContext).Run();
                await stateService.SetState(InstanceState.WarmingUp);
                await new UpdateDamUri(initContext).Run();
                await new PushSerialized(initContext).Run();
                await new ClearAllCaches(initContext).Run();
                await new WarmupCM(initContext).Run();
                await stateService.SetState(InstanceState.Ready);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error has occurred when running JobManagementManagementService");
            }
        }
    }
}