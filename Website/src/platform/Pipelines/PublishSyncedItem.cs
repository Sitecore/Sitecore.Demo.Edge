using System;
using System.Collections.Generic;
using System.Linq;
using HtmlAgilityPack;
using Sitecore.Abstractions;
using Sitecore.Connector.CMP;
using Sitecore.Connector.CMP.Conversion;
using Sitecore.Connector.CMP.Helpers;
using Sitecore.Connector.CMP.Pipelines.ImportEntity;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.SearchTypes;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.SecurityModel;
using Sitecore.Data;
using Sitecore.Publishing;

namespace Sitecore.Demo.Edge.Website.Pipelines
{
    public class PublishSyncedItem : ImportEntityProcessor
    {
        private static CmpSettings _settings;
        protected BaseLog Logger { get; }

        public PublishSyncedItem(BaseLog logger, CmpSettings settings)
            : base(logger, settings)
        {
            this.Logger = logger;
            PublishSyncedItem._settings = settings;
        }

        public override void Process(ImportEntityPipelineArgs args, BaseLog logger)
        {

            PublishOptions publishOptions = new PublishOptions(args.Item.Database,
                Database.GetDatabase("web"), PublishMode.Incremental, args.Item.Language, DateTime.Now);
            publishOptions.RootItem = args.Item;
            publishOptions.Deep = true;
            publishOptions.PublishRelatedItems = true;
            publishOptions.CompareRevisions = true;

            var handle = PublishManager.Publish(new PublishOptions[] { publishOptions });
            PublishManager.WaitFor(handle);

            Log.Info("DEMO CUSTOMIZATION : Published item " + args.Item.Name + " with id: " + args.Item.ID, this);
        }

    }
}