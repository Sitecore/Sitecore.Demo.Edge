using Sitecore.Abstractions;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Serialization;
using Sitecore.LayoutService.Serialization.FieldSerializers;
using Sitecore.LayoutService.Serialization.Pipelines.GetFieldSerializer;

namespace Sitecore.Demo.Edge.Website.CustomFields
{

    public class CmpMultiListFIeldSerializer : BaseGetFieldSerializer
    {
        protected readonly BaseMediaManager MediaManager;

        public CmpMultiListFIeldSerializer(IFieldRenderer fieldRenderer, BaseMediaManager mediaManager)
            : base(fieldRenderer)
            => this.MediaManager = mediaManager;

        protected override void SetResult(GetFieldSerializerPipelineArgs args)
        {
            Assert.ArgumentNotNull((object)args, nameof(args));
            Assert.IsNotNull((object)args.Field, "args.Field is null");
            Assert.IsNotNull((object)args.ItemSerializer, "args.ItemSerializer is null");
            args.Result = (IFieldSerializer)new MultilistFieldSerializer(args.ItemSerializer, this.FieldRenderer, this.MediaManager);
        }
    }
}