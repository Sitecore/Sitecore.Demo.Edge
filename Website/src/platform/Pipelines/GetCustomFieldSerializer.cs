using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.Abstractions;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Serialization;
using Sitecore.LayoutService.Serialization.FieldSerializers;
using Sitecore.LayoutService.Serialization.Pipelines.GetFieldSerializer;

namespace Sitecore.Demo.Edge.Website.Pipelines
{
    public class GetCustomFieldSerializer : BaseGetFieldSerializer
    {

        public GetCustomFieldSerializer(IFieldRenderer fieldRenderer)
            : base(fieldRenderer)
        {
        }


        protected override void SetResult(GetFieldSerializerPipelineArgs args)
        {
            Assert.ArgumentNotNull((object) args, nameof(args));
            args.Result = new CmpListFieldSerializer(this.FieldRenderer);
        }
    }
}