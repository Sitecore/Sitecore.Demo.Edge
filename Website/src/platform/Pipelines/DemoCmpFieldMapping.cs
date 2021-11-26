using System;
using System.Collections.Generic;
using System.Linq;
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

namespace Sitecore.Demo.Edge.Website.Pipelines
{
    public class DemoCmpFieldMapping : SaveFieldValues
    {
        private static CmpSettings _settings;
        private readonly ICmpConverterMapper _mapper;
        private readonly CmpHelper _cmpHelper;

        public DemoCmpFieldMapping(ICmpConverterMapper mapper, BaseLog logger, CmpHelper cmpHelper,
            CmpSettings settings) : base(mapper, logger, cmpHelper, settings)
        {
            this._mapper = mapper;
            DemoCmpFieldMapping._settings = settings;
            this._cmpHelper = cmpHelper;
        }

        public override void Process(ImportEntityPipelineArgs args, BaseLog logger)
        {
            Assert.IsNotNull((object)args.Item, "The item is null.");
            Assert.IsNotNull((object)args.Language, "The language is null.");
            using (new SecurityDisabler())
            {
                using (new LanguageSwitcher(args.Language))
                {
                    bool flag = false;
                    try
                    {
                        Log.Debug("DEMO CUSTOMIZATION: Processing Item: " + args.Item.Name, this);
                        args.Item.Editing.BeginEdit();
                        args.Item[Connector.CMP.Constants.EntityIdentifierFieldId] = args.EntityIdentifier;
                        flag = this.TryMapConfiguredFields(args);
                    }
                    catch
                    {
                        flag = false;
                        throw;
                    }
                    finally
                    {
                        if (flag)
                        {
                            args.Item.Editing.EndEdit();
                        }
                        else
                        {
                            args.Item.Editing.CancelEdit();
                            args.Item.Editing.BeginEdit();
                            args.Item[Connector.CMP.Constants.EntityIdentifierFieldId] = args.EntityIdentifier;
                            args.Item.Editing.EndEdit();
                        }
                    }
                }
            }
        }

        internal virtual bool TryMapConfiguredFields(ImportEntityPipelineArgs args)
        {
            if (args.EntityMappingItem == null)
            {
                args.EntityMappingItem = this._cmpHelper.GetEntityMappingItem(args);
            }

            Assert.IsNotNull((object)args.EntityMappingItem,
                "Could not find any Entity Mapping item for the Entity Type (Schema): " + args.ContentTypeIdentifier);
            bool flag = false;

            foreach (Item obj in args.EntityMappingItem.Children.Where<Item>((Func<Item, bool>)(i =>
               i.TemplateID == Sitecore.Connector.CMP.Constants.RelationFieldMappingTemplateId)))
            {
                string fieldName = obj[Sitecore.Connector.CMP.Constants.FieldMappingSitecoreFieldNameFieldId];
                string str = obj[Sitecore.Connector.CMP.Constants.FieldMappingCmpFieldNameFieldId];

                if (!string.IsNullOrEmpty(fieldName))
                {
                    if (!string.IsNullOrEmpty(str))
                    {
                        try
                        {
                            if (obj.TemplateID == Sitecore.Connector.CMP.Constants.RelationFieldMappingTemplateId)
                            {
                                string cmpRelationName =
                                    obj[
                                        Sitecore.Connector.CMP.Constants
                                            .RelationFieldMappingCmpRelationFieldNameFieldId];

                                if (string.IsNullOrEmpty(cmpRelationName))
                                {
                                    this.Logger.Error(
                                        BaseHelper.GetLogMessageText(
                                            DemoCmpFieldMapping._settings.LogMessageTitle,
                                            string.Format(
                                                "Configuration of the field mapping '{0}' is incorrect. Required fields are not specified.",
                                                (object)obj.ID)), (object)this);
                                    flag = true;
                                    continue;
                                }

                                if (args.Item.Fields[fieldName].Type == "CmpMultiList")
                                {
                                    Log.Debug("DEMO CUSTOMIZATION: CmpMultiList field '" + args.Item.Fields[fieldName].Name + "' initial value: " + args.Item[fieldName], this);
                                    args.Item[fieldName] = GetListfieldValue(args.Item[fieldName],
                                        args.Item.Fields[fieldName].Source, args.Item.Database);
                                    Log.Debug("DEMO CUSTOMIZATION: CmpMultiList field '" + args.Item.Fields[fieldName].Name + "' edited with: " + args.Item[fieldName], this);
                                }
                                else
                                {
                                    List<string> stringList =
                                        this._cmpHelper.TryMapRelationPropertyValues(args, cmpRelationName, str);
                                    args.Item[fieldName] = stringList.Count != 0
                                        ? string.Join(
                                            DemoCmpFieldMapping._settings.RelationFieldMappingSeparator,
                                            (IEnumerable<string>)stringList)
                                        : string.Empty;
                                }
                                continue;
                            }

                            args.Item[fieldName] = this._mapper.Convert(args.EntityDefinition, str,
                                args.Entity.GetPropertyValue(str));
                            continue;
                        }
                        catch (Exception ex)
                        {
                            this.Logger.Error(BaseHelper.GetLogMessageText(
                                    DemoCmpFieldMapping._settings.LogMessageTitle,
                                    $"An error occurred during converting '{(object)str}' field to '{(object)fieldName}' field. Field mapping ID: '{(object)obj.ID}'."),
                                ex, (object)this);
                            flag = true;
                            args.Exception = ex;
                            continue;
                        }
                    }
                }

                this.Logger.Error(
                    BaseHelper.GetLogMessageText(DemoCmpFieldMapping._settings.LogMessageTitle,
                        $"Configuration of the field mapping '{(object)obj.ID}' is incorrect. Required fields are not specified."), (object)this);
                flag = true;
            }

            return !flag;
        }


        public string GetListfieldValue(string value, string source, Database contentDatabase)
        {
            if (string.IsNullOrEmpty(value)) return string.Empty;

            string[] nameValues = value.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            string[] newValues = new string[nameValues.Length];

            if (nameValues.Length <= 0) return string.Empty;

            for (var i = 0; i < nameValues.Length; i++)
            {
                string name = nameValues[i].Trim();
                if (string.IsNullOrEmpty(name))
                {
                    newValues[i] = Translate.Text("Item not found");
                }

                Item item = contentDatabase.GetItem(source + "/" + name);

                if (item != null)
                {
                    newValues[i] = item.ID.ToString();
                }
                else
                {
                    item = GetItemByDisplayName(name, source);
                    if (item != null)
                    {
                        newValues[i] = item.ID.ToString();
                    }
                    else
                    {
                        newValues[i] = name + ' ' + Translate.Text("[Item not found]");
                    }
                }
            }
            return string.Join("|", newValues);
        }

        public Item GetItemByDisplayName(string displayName, string source)
        {
            var searchIndex = ContentSearchManager.GetIndex("sitecore_master_index");
            using (var context = searchIndex.CreateSearchContext())
            {
                IQueryable<SearchResultItem> query = context.GetQueryable<SearchResultItem>()
                    .Where(p => p.Path.StartsWith(source));

                SearchResultItem searchResultItems =
                    query.FirstOrDefault(i => i["_displayname"].Equals(displayName, StringComparison.OrdinalIgnoreCase));

                if (searchResultItems == null)
                {
                    searchResultItems = context.GetQueryable<SearchResultItem>().FirstOrDefault(i => i.Name.Equals(displayName, StringComparison.OrdinalIgnoreCase));
                }

                return searchResultItems?.GetItem();
            }
        }

    }
}