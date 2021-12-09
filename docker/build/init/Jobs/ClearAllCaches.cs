using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Sitecore.Demo.Init.Jobs
{
    using Microsoft.Extensions.Logging;

    class ClearAllCaches : TaskBase
    {
        public ClearAllCaches(InitContext initContext)
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

            var host = Environment.GetEnvironmentVariable("HOST_CM");
            using var client = new HttpClient { BaseAddress = new Uri(host) };
            using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, $"/Utilities/ClearAllCaches.aspx"))
            {
                using (var response = await client.SendAsync(request))
                {
                    Log.LogInformation($"ClearAllCaches() {host} started");
                    var contents = await response.Content.ReadAsStringAsync();
                    Log.LogInformation($"{response.StatusCode} {contents}");
                    Log.LogInformation($"ClearAllCaches() {host} complete");
                }
            }

            await Complete();
        }
    }
}