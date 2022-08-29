using Sitecore.Configuration;
using Sitecore.Pipelines.PreprocessRequest;
using System.Web;

namespace Sitecore.Demo.Edge.Website.Pipelines
{
    /// <summary>
    /// Fix for media library image requests errors in development.
    /// See https://sitecore.stackexchange.com/q/31578/171
    /// </summary>
    public class LoadBalancingSchemeFix : PreprocessRequestProcessor
    {
        public override void Process(PreprocessRequestArgs args)
        {
            var scheme = HttpContext.Current?.Request?.Headers?[Settings.LoadBalancingScheme];
            if (Settings.LoadBalancingEnabled && (scheme?.Contains(",") ?? false))
            {
                HttpContext.Current.Request.Headers[Settings.LoadBalancingScheme] = scheme.Split(',')[0];
            }
        }
    }
}
