using System.Linq;
using System.Web.Helpers;
using Sitecore.ContentSearch.Utilities;
using Sitecore.Data;
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

            Diagnostics.Log.Warn("Topaz RenderedItem " + (args.RenderedItem == null).ToString(), this);
            Diagnostics.Log.Warn("Topaz RenderedItem " + args.RenderedItem.Name, this);
            Diagnostics.Log.Warn("Topaz Database " + (args.RenderedItem.Database == null).ToString(), this);
            Diagnostics.Log.Warn("Topaz Database " + args.RenderedItem.Database.Name, this);

            Item eventItem = args.RenderedItem?.Database?.GetItem("/sitecore/content/CMP/Events/Play Summit");
            
            if (eventItem == null) return;

            Diagnostics.Log.Warn("Topaz eventItem " + (eventItem == null).ToString(), this);
            Diagnostics.Log.Warn("Topaz eventItem " + eventItem.Name , this);

            string s = string.Join(";", args.ContextData.Select(x => x.Key + " = " + x.Value).ToArray());
            Diagnostics.Log.Warn("Topaz contextData " + s, this);

            Diagnostics.Log.Warn("Topaz item " + (string.IsNullOrEmpty(eventItem.Fields["StartDate"].Value) ? "no date" : eventItem.Fields["StartDate"].Value), this);
            Diagnostics.Log.Warn("Topaz item PageTitlePrefix " + (string.IsNullOrEmpty(eventItem.Fields["PageTitlePrefix"].Value) ? "no title" : eventItem.Fields["PageTitlePrefix"].Value), this);

            args.ContextData.Add("EventInfo", new
            {
                name = "topaz",
                EventId = eventItem?.ID.ToString(),
                //StartDate = eventItem?.Fields["StartDate"].Value,
                //TitlePrefix = eventItem?.Fields["PageTitlePrefix"].Value
            });
        }
    }
}