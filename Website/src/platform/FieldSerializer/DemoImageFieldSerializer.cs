using System.Collections.Generic;
using System.Web;
using Sitecore.Data.Fields;
using Sitecore.LayoutService.Serialization;
using Sitecore.LayoutService.Serialization.FieldSerializers;
using HtmlAgilityPack;
using Newtonsoft.Json;

namespace Sitecore.Demo.Edge.Website.FieldSerializer
{
    public class DemoImageFieldSerializer : BaseFieldSerializer

    {
        private string _renderedValue;

        public DemoImageFieldSerializer(IFieldRenderer fieldRenderer)
          : base(fieldRenderer)
        {
        }

        protected override void WriteValue(Field field, JsonTextWriter writer) => this.WriteImageObject(this.ParseRenderedImage(this.GetRenderedValue(field), field.Source), field, writer);

        protected override void WriteRenderedValue(Field field, JsonTextWriter writer)
        {
            string renderedValue = this.GetRenderedValue(field);
            writer.WriteValue(renderedValue);
        }

        protected virtual string GetRenderedValue(Field field, SerializationOptions options = null)
        {
            if (string.IsNullOrWhiteSpace(this._renderedValue))
                this._renderedValue = this.RenderField(field, options != null && options.DisableEditing).ToString();
            return this._renderedValue;
        }

        protected virtual IDictionary<string, string> ParseRenderedImage(string renderedField, string sourceValue)
        {
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            HtmlDocument htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(renderedField);
            if (htmlDocument.DocumentNode == null || !htmlDocument.DocumentNode.HasChildNodes)
                return (IDictionary<string, string>)dictionary;
            HtmlNode htmlNode = htmlDocument.DocumentNode.SelectSingleNode("//img");
            if (htmlNode == null)
            {
                htmlNode = htmlDocument.DocumentNode.SelectSingleNode("//image");
                if (htmlNode == null)
                    return (IDictionary<string, string>)dictionary;
            }
            foreach (HtmlAttribute attribute in (IEnumerable<HtmlAttribute>)htmlNode.Attributes)
            {
                string transformationValue = (attribute.Name == "src" && renderedField.Contains("stylelabs-content-id") && !string.IsNullOrWhiteSpace(sourceValue)) ? "&t=" + sourceValue : "";

                dictionary[attribute.Name] = HttpUtility.HtmlDecode(attribute.Value + transformationValue);

            }
            return (IDictionary<string, string>)dictionary;
        }

        protected virtual void WriteImageObject(
          IDictionary<string, string> imageProperties,
          Field field,
          JsonTextWriter writer)
        {
            writer.WriteStartObject();
            foreach (KeyValuePair<string, string> imageProperty in (IEnumerable<KeyValuePair<string, string>>)imageProperties)
            {
                writer.WritePropertyName(imageProperty.Key);
                writer.WriteValue(imageProperty.Value);
            }
            writer.WriteEndObject();
        }
    }
}
