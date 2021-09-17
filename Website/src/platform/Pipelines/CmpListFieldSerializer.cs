using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Sitecore.Abstractions;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Demo.Edge.Website.CustomFields;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Serialization;
using Sitecore.LayoutService.Serialization.FieldSerializers;
using Sitecore.LayoutService.Serialization.ItemSerializers;
using Sitecore.Shell.Applications.ContentEditor;

namespace Sitecore.Demo.Edge.Website.Pipelines
{
    public class CmpListFieldSerializer : BaseFieldSerializer
    {
        public CmpListFieldSerializer(IFieldRenderer fieldRenderer)
            : base(fieldRenderer)
        {
        }


        protected override void WriteValue(Field field, JsonTextWriter writer)
        {
            writer.WriteStartObject();
            writer.WritePropertyName(field.Name);
            writer.WriteValue("Your custom field value here.");
            writer.WriteEndObject();
        }

    }
}