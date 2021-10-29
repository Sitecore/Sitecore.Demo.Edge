using System;
using Sitecore.Abstractions;
using Sitecore.Connector.CMP;
using Sitecore.Connector.CMP.Pipelines.ImportEntity;
using Sitecore.Diagnostics;
using Sitecore.Data;
using Sitecore.Publishing;

namespace Sitecore.Demo.Edge.Website.Pipelines
{
    public class PublishSyncedItem : ImportEntityProcessor
    {
        public PublishSyncedItem(BaseLog logger, CmpSettings settings)
            : base(logger, settings)
        {
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