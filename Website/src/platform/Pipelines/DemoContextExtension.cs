using System.Collections.Generic;
using System.Linq;
using Sitecore.Data.Items;
using Sitecore.Data.Managers;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.JavaScriptServices.Configuration;
using Sitecore.LayoutService.ItemRendering.Pipelines.GetLayoutServiceContext;

namespace Sitecore.Demo.Edge.Website.Pipelines
{
    public class DemoContextExtension : Sitecore.JavaScriptServices.ViewEngine.LayoutService.Pipelines.
        GetLayoutServiceContext.JssGetLayoutServiceContextProcessor
    {
        private string configItemPath;
        public string ConfigItemPath { get { return configItemPath; } set { configItemPath = value; } }
        
        private string startDateFieldName;
        public string StartDateFieldName { get { return startDateFieldName; } set { startDateFieldName = value; } }
        
        private string pageTitleFIeldName;
        public string PageTitleFIeldName { get { return pageTitleFIeldName; } set { pageTitleFIeldName = value; } }

        public DemoContextExtension(IConfigurationResolver configurationResolver) : base(configurationResolver)
        {
        }

        protected override void DoProcess(GetLayoutServiceContextArgs args, AppConfiguration application)
        {
            Assert.ArgumentNotNull(args, "args");
            if (!string.IsNullOrEmpty(configItemPath) || !string.IsNullOrEmpty(startDateFieldName) || !string.IsNullOrEmpty(pageTitleFIeldName))
            {
                Assert.IsNotNull(configItemPath, "No config item path or field names in parameter");
            }

            var langVersions = new List<Language>();
            Item tempItem = Sitecore.Context.Item;
            foreach (var itemLanguage in tempItem.Languages)
            {
                var item = tempItem.Database.GetItem(tempItem.ID, itemLanguage);
                if (item.Versions.Count > 0 || item.IsFallback)
                {
                    langVersions.Add(itemLanguage);
                }
            }

            Item eventItem = args?.RenderedItem?.Database?.GetItem(configItemPath);
            
            if (eventItem == null) return;

            args.ContextData.Add("EventInfo", new
            {
                StartDate = eventItem?.Fields[startDateFieldName]?.Value,
                TitlePrefix = eventItem?.Fields[pageTitleFIeldName]?.Value
            });

            args.ContextData.Add("Languages", langVersions);

        }
    }
}