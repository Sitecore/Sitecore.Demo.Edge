using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Serialization;
using Sitecore.LayoutService.Serialization.FieldSerializers;
using Sitecore.LayoutService.Serialization.Pipelines.GetFieldSerializer;

namespace Sitecore.Demo.Edge.Website.FieldSerializer
{
    public class GetDemoImageFieldSerializer: BaseGetFieldSerializer
    {
        public GetDemoImageFieldSerializer(IFieldRenderer fieldRenderer)
            : base(fieldRenderer)
        {
        }

        protected override void SetResult(GetFieldSerializerPipelineArgs args)
        {
            Assert.ArgumentNotNull((object)args, nameof(args));
            Log.Debug("DEMO TEAM CUSTOMIZATION: New Image Serialization", this);
            args.Result = (IFieldSerializer)new DemoImageFieldSerializer(this.FieldRenderer);
        }
    }
}