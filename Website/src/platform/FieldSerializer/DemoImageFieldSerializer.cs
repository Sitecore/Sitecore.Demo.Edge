using System.Collections.Generic;
using System.Web;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.LayoutService.Serialization;
using Sitecore.LayoutService.Serialization.FieldSerializers;
using HtmlAgilityPack;
using Newtonsoft.Json;
using Sitecore.Web;

namespace Sitecore.Demo.Edge.Website.FieldSerializer
{
    public class DemoImageFieldSerializer : BaseFieldSerializer

    {
        private string _renderedValue;

        public DemoImageFieldSerializer(IFieldRenderer fieldRenderer)
          : base(fieldRenderer)
        {
        }

        protected override void WriteValue(Field field, JsonTextWriter writer) => this.WriteImageObject(ParseRenderedImage(GetRenderedValue(field), field), field, writer);

        protected override void WriteRenderedValue(Field field, JsonTextWriter writer)
        {
            if (field.Type == "Image")
            {
                string renderedValue = this.GetRenderedValue(field);
                writer.WriteValue(renderedValue);
            }
        }

        protected virtual string GetRenderedValue(Field field, SerializationOptions options = null)
        {
            if (string.IsNullOrWhiteSpace(this._renderedValue))
            {
                this._renderedValue = this.RenderField(field, options != null && options.DisableEditing).ToString();
            }

            string transformation = "web";
            Item item = field.Item;
            string transformationFieldName = field.Name + "Transformation";
            if (item?.Fields[transformationFieldName] != null)
            {
                transformation = item.Fields[transformationFieldName].Value;
            }

            var fieldValue = this._renderedValue;

            if (fieldValue.Contains("stylelabs-content-id"))
            {
                bool addTransformation = false;
                string source = "";
                try
                {
                    HtmlDocument htmlDocument = new HtmlDocument();
                    htmlDocument.LoadHtml(fieldValue);

                    HtmlNode htmlNode = htmlDocument.DocumentNode.SelectSingleNode("//input");
                    foreach (HtmlAttribute attribute in htmlNode.Attributes)
                    {
                        if (attribute.Name.Equals("value"))
                        {
                            HtmlDocument htmlDocumentValue = new HtmlDocument();
                            htmlDocumentValue.LoadHtml(HttpUtility.HtmlDecode(attribute.Value));
                            HtmlNode htmlNodeValue = htmlDocument.DocumentNode.SelectSingleNode("//image");

                            source = htmlNodeValue.Attributes["src"].Value;
                            addTransformation = true;
                        }
                    }

                    if (addTransformation && !source.Contains("&t="))
                    {
                        this._renderedValue = this._renderedValue.Replace(source, source + "&t=" + transformation);
                    }
                }
                catch
                {

                }
            }

            return this._renderedValue;
        }

        protected virtual IDictionary<string, string> ParseRenderedImage(string renderedField, Field field)
        {
            string transformation = "web";
            Item item = field.Item;
            string transformationFieldName = field.Name + "Transformation";
            if (item?.Fields[transformationFieldName] != null)
            {
                transformation = item.Fields[transformationFieldName].Value;
            }

            try
            {
                Dictionary<string, string> imageRawValueAttributesDictionary = new Dictionary<string, string>();
                HtmlDocument htmlDocument = new HtmlDocument();
                htmlDocument.LoadHtml(renderedField);
                if (htmlDocument.DocumentNode == null || !htmlDocument.DocumentNode.HasChildNodes)
                {
                    return imageRawValueAttributesDictionary;
                }

                HtmlNode htmlNode = htmlDocument.DocumentNode.SelectSingleNode("//img");
                if (htmlNode == null)
                {
                    htmlNode = htmlDocument.DocumentNode.SelectSingleNode("//image");
                    if (htmlNode == null)
                    {
                        return imageRawValueAttributesDictionary;
                    }
                }

                foreach (HtmlAttribute attribute in htmlNode.Attributes)
                {
                    string transformationValue = (attribute.Name == "src" && renderedField.Contains("stylelabs-content-id") && !string.IsNullOrWhiteSpace(transformation)) ? "&t=" + transformation : "";

                    imageRawValueAttributesDictionary[attribute.Name] = HttpUtility.HtmlDecode(attribute.Value + transformationValue);
                }

                return imageRawValueAttributesDictionary;
            }
            catch
            {
                // Happens when Content Hub times out. We ignore and just return the larger image without the transformation.
            }

            return null;
        }

        protected virtual void WriteImageObject(
          IDictionary<string, string> imageProperties,
          Field field,
          JsonTextWriter writer)
        {
            writer.WriteStartObject();
            foreach (KeyValuePair<string, string> imageProperty in imageProperties)
            {
                writer.WritePropertyName(imageProperty.Key);
                writer.WriteValue(imageProperty.Value);
            }
            writer.WriteEndObject();
        }
    }
}
