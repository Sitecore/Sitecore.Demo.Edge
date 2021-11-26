using System;
using Sitecore.Abstractions;
using Sitecore.Connector.CMP;
using Sitecore.Connector.CMP.Pipelines.ImportEntity;
using Sitecore.Diagnostics;
using Sitecore.Publishing;
using Sitecore.Configuration;

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
            var source = args.Item.Database;
            var target = Factory.GetDatabase("web");

            PublishOptions publishOptions = new PublishOptions(source, target, PublishMode.SingleItem, args.Item.Language, DateTime.Now)
            {
                RootItem = args.Item,
                Deep = true,
                PublishRelatedItems = true
            };

            var publisher = new Publisher(publishOptions);
            publisher.PublishAsync();

            Log.Info("DEMO CUSTOMIZATION : Published item " + args.Item.Name + " with id: " + args.Item.ID, this);
        }

    }
}