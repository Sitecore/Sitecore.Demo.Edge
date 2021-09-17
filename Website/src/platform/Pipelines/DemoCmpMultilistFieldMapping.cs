using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Helpers;
using Newtonsoft.Json;
using Sitecore.Abstractions;
using Sitecore.Connector.CMP;
using Sitecore.Connector.CMP.Conversion;
using Sitecore.Connector.CMP.Helpers;
using Sitecore.Connector.CMP.Pipelines.ImportEntity;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Data.Query;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.SecurityModel;

using Sitecore.Abstractions;
using Sitecore.Connector.CMP.Helpers;
using Sitecore.Connector.CMP.Models;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.SecurityModel;
using Stylelabs.M.Sdk.Contracts.Base;
using System;
using System.Collections.Generic;
using System.Linq;


namespace Sitecore.Demo.Edge.Website.Pipelines
{
    public class DemoCmpMultilistFieldMapping : SaveFieldValues
    {
        private static CmpSettings _settings;
        private readonly ICmpConverterMapper _mapper;
        private readonly CmpHelper _cmpHelper;
        private readonly BaseFactory _factory;

        public DemoCmpMultilistFieldMapping(ICmpConverterMapper mapper, BaseLog logger, CmpHelper cmpHelper,
            CmpSettings settings) : base(mapper, logger, cmpHelper, settings)
        {
            //this._factory = factory;
            this._mapper = mapper;
            DemoCmpMultilistFieldMapping._settings = settings;
            this._cmpHelper = cmpHelper;
        }

        public void logThis(string msg)
        {
            Log.Info("nananana =============================================================== batmaaan", this);
            Log.Info("========== " + msg, this);
        }

        public override void Process(ImportEntityPipelineArgs args, BaseLog logger)
        {
            Assert.IsNotNull((object) args.Item, "The item is null.");
            Assert.IsNotNull((object) args.Language, "The language is null.");
            using (new SecurityDisabler())
            {
                using (new LanguageSwitcher(args.Language))
                {
                    bool flag = false;
                    try
                    {
                        args.Item.Editing.BeginEdit();
                        args.Item[Sitecore.Connector.CMP.Constants.EntityIdentifierFieldId] = args.EntityIdentifier;
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
                            args.Item[Sitecore.Connector.CMP.Constants.EntityIdentifierFieldId] = args.EntityIdentifier;
                            args.Item.Editing.EndEdit();
                        }
                    }
                }
            }
        }

        internal virtual bool TryMapConfiguredFields(ImportEntityPipelineArgs args)
        {
            if (args.EntityMappingItem == null)
                args.EntityMappingItem = this._cmpHelper.GetEntityMappingItem(args);
            Assert.IsNotNull((object) args.EntityMappingItem,
                "Could not find any Entity Mapping item for the Entity Type (Schema): " + args.ContentTypeIdentifier);
            bool flag = false;



            foreach (Item obj in args.EntityMappingItem.Children.Where<Item>((Func<Item, bool>) (i =>
                i.TemplateID == Sitecore.Connector.CMP.Constants.RelationFieldMappingTemplateId)))
            {
                string fieldName = obj[Sitecore.Connector.CMP.Constants.FieldMappingSitecoreFieldNameFieldId];
                string str = obj[Sitecore.Connector.CMP.Constants.FieldMappingCmpFieldNameFieldId];

                logThis(fieldName + " =========================> " + str);
                logThis("value => " + args.Item[fieldName]);
                logThis("template name: " + args.Item.TemplateName);
                logThis("field type: " + args.Item.Fields[fieldName].Type);
                logThis("source: " + args.Item.Fields[fieldName].Source);
                
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
                                logThis(cmpRelationName);
                                if (string.IsNullOrEmpty(cmpRelationName))
                                {
                                    this.Logger.Error(
                                        BaseHelper.GetLogMessageText(
                                            DemoCmpMultilistFieldMapping._settings.LogMessageTitle,
                                            string.Format(
                                                "Configuration of the field mapping '{0}' is incorrect. Required fields are not specified.",
                                                (object) obj.ID)), (object) this);
                                    flag = true;
                                    continue;
                                }
                                
                                if (args.Item.Fields[fieldName].Type == "CmpMultiList")
                                {
                                    args.Item[fieldName] = GetListfieldValue(args.Item[fieldName],
                                        args.Item.Fields[fieldName].Source, args.Item.Database);
                                }
                                else
                                {
                                    List<string> stringList =
                                        this._cmpHelper.TryMapRelationPropertyValues(args, cmpRelationName, str);
                                    args.Item[fieldName] = stringList.Count != 0
                                        ? string.Join(
                                            DemoCmpMultilistFieldMapping._settings.RelationFieldMappingSeparator,
                                            (IEnumerable<string>) stringList)
                                        : string.Empty;
                                }

                                logThis("______" + args.Item[fieldName]);
                                continue;
                            }

                            args.Item[fieldName] = this._mapper.Convert(args.EntityDefinition, str,
                                args.Entity.GetPropertyValue(str));
                            logThis("______" + args.Item[fieldName]);
                            continue;
                        }
                        catch (Exception ex)
                        {
                            this.Logger.Error(BaseHelper.GetLogMessageText(
                                    DemoCmpMultilistFieldMapping._settings.LogMessageTitle,
                                    $"An error occured during converting '{(object) str}' field to '{(object) fieldName}' field. Field mapping ID: '{(object) obj.ID}'."),
                                ex, (object) this);
                            flag = true;
                            args.Exception = ex;
                            continue;
                        }
                    }
                }

                this.Logger.Error(
                    BaseHelper.GetLogMessageText(DemoCmpMultilistFieldMapping._settings.LogMessageTitle,
                        string.Format(
                            "Configuration of the field mapping '{0}' is incorrect. Required fields are not specified.",
                            (object) obj.ID)), (object) this);
                flag = true;
            }

            return !flag;
        }


        public string GetListfieldValue(string value, string source, Database contentDatabase)
        {
            string[] nameValues = value.Split(new char[] {','}, StringSplitOptions.RemoveEmptyEntries);
            string[] newValues = new string[nameValues.Length];

            if (nameValues.Length > 0)
            {
                for (int i = 0; i < nameValues.Length; i++)
                {
                    string name = nameValues[i].Trim();
                    if (!string.IsNullOrEmpty(name))
                    {
                        Item item = contentDatabase.GetItem(source + "/" + name);

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
            }

            return string.Join("|", newValues);
        }

    }
}