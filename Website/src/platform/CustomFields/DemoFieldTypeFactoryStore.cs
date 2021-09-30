using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Collections.Generic;
using Sitecore.Services.GraphQL.Content.TemplateGeneration.FieldMapping;
using Sitecore.Services.GraphQL.EdgeSchema.GraphTypes.FieldTypes;
using Sitecore.Services.GraphQL.EdgeSchema.TemplateGeneration.FieldMapping;

namespace Sitecore.Demo.Edge.Website.CustomFields
{
    
    public class DemoFieldTypeFactoryStore : IFieldTypeFactoryStore
    {
        private Dictionary<string, IFieldTypeFactory> _fieldTypes;

        public DemoFieldTypeFactoryStore()
        {
            _fieldTypes = new Dictionary<string, IFieldTypeFactory>();
            _fieldTypes.Add("Checkbox", new GenericFieldTypeFactory<CheckboxFieldGraphType>());
            _fieldTypes.Add("Date", new GenericFieldTypeFactory<DateFieldGraphType>());
            _fieldTypes.Add("Datetime", new GenericFieldTypeFactory<DateFieldGraphType>());
            _fieldTypes.Add("Image", new GenericFieldTypeFactory<ImageFieldGraphType>());
            _fieldTypes.Add("Integer", new GenericFieldTypeFactory<IntegerFieldGraphType>());
            _fieldTypes.Add("Number", new GenericFieldTypeFactory<NumberFieldGraphType>());
            _fieldTypes.Add("Checklist", new GenericFieldTypeFactory<MultilistFieldGraphType>());
            _fieldTypes.Add("Multilist", new GenericFieldTypeFactory<MultilistFieldGraphType>());
            _fieldTypes.Add("Multilist with Search", new GenericFieldTypeFactory<MultilistFieldGraphType>());
            _fieldTypes.Add("Name Value List", new GenericFieldTypeFactory<NameValueListFieldGraphType>());
            _fieldTypes.Add("Name Lookup Value List", new GenericFieldTypeFactory<NameValueListFieldGraphType>());
            _fieldTypes.Add("Treelist", new GenericFieldTypeFactory<MultilistFieldGraphType>());
            _fieldTypes.Add("TreelistEx", new GenericFieldTypeFactory<MultilistFieldGraphType>());
            _fieldTypes.Add("Droplink", new GenericFieldTypeFactory<LookupFieldGraphType>());
            _fieldTypes.Add("Droptree", new GenericFieldTypeFactory<LookupFieldGraphType>());
            _fieldTypes.Add("General Link", new GenericFieldTypeFactory<LinkFieldGraphType>());
            _fieldTypes.Add("General Link with Search", new GenericFieldTypeFactory<LinkFieldGraphType>());
            _fieldTypes.Add("Rich Text", new GenericFieldTypeFactory<RichTextFieldGraphType>());
            _fieldTypes.Add("lookup", new GenericFieldTypeFactory<LookupFieldGraphType>());
            _fieldTypes.Add("reference", new GenericFieldTypeFactory<LookupFieldGraphType>());
            _fieldTypes.Add("tree", new GenericFieldTypeFactory<LookupFieldGraphType>());
            _fieldTypes.Add("default", new GenericFieldTypeFactory<ItemFieldGraphType>());
            _fieldTypes.Add("CmpMultiList", new GenericFieldTypeFactory<MultilistFieldGraphType>());
        }

        public IFieldTypeFactory GetFieldFactory(string fieldType)
        {
            _fieldTypes.TryGetValue(fieldType, out var factory);
            return factory;
        }

        public IFieldTypeFactory Default => _fieldTypes["default"];
    }
}