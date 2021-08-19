using Sitecore.Data.Items;
using Sitecore.JavaScriptServices.Configuration;
using Sitecore.LayoutService.ItemRendering.Pipelines.GetLayoutServiceContext;

namespace Sitecore.Demo.Edge.Website.Pipelines
{
    public class DemoContextExtension : Sitecore.JavaScriptServices.ViewEngine.LayoutService.Pipelines.
        GetLayoutServiceContext.JssGetLayoutServiceContextProcessor
    {
        public DemoContextExtension(IConfigurationResolver configurationResolver) : base(configurationResolver)
        {
        }

        protected override void DoProcess(GetLayoutServiceContextArgs args, AppConfiguration application)
        {
            Item eventItem = args?.RenderedItem?.Database?.GetItem("/sitecore/content/CMP/Events/Play Summit");
            
            if (eventItem == null) return;

            args.ContextData.Add("EventInfo", new
            {
                StartDate = eventItem?.Fields["StartDate"]?.Value,
                TitlePrefix = eventItem?.Fields["PageTitlePrefix"]?.Value
            });
        }
    }
}