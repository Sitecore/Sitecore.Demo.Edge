using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.UI;
using Sitecore.Configuration;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.Resources;
using Sitecore.Shell.Applications.ContentEditor;
using Sitecore.Shell.Applications.ContentEditor.FieldHelpers;
using Sitecore.Text;
using Sitecore.Web.UI.HtmlControls;
using Sitecore.Web.UI.Sheer;
using Sitecore.Web.UI.WebControls;
using Sitecore.Configuration;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.Resources;
using Sitecore.Shell.Applications.ContentEditor.FieldHelpers;
using Sitecore.Text;
using Sitecore.Web.UI.HtmlControls;
using Sitecore.Web.UI.HtmlControls.Data;
using Sitecore.Web.UI.Sheer;
using Sitecore.Web.UI.WebControls;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web.UI;
using Sitecore.Shell;
using System;
using System.Collections.Generic;
using System.Web.UI;
using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Shell.Applications.ContentEditor;
using System.Linq;
using System.Configuration;
using System.Web;

namespace Sitecore.Demo.Edge.Website.CustomFields
{
    public class CmpMultiList : TreeList
    {
        private string _itemID;
        private Listbox _listBox;
        private string _source;
        protected new readonly TreeListFilterQueryBuilder FilterQueryBuilder;
        private bool hasValidSource;

        public CmpMultiList()
        {
            this.Class = base.Class + " ftFieldTreeListExtended";
            this.Activation = true;
            this.ReadOnly = false;
            this.FilterQueryBuilder = new TreeListFilterQueryBuilder();
        }

        public new string Source { get; set; }
        public static bool HasSourceChanged = false;
        protected override void DoRender(HtmlTextWriter output)
        {
            if (hasValidSource)
            {
                base.DoRender(output);
                return;
            }
        }
        protected override void OnPreRender(EventArgs e)
        {
            base.OnPreRender(e);
            this.ServerProperties["Value"] = this.ServerProperties["Value"];
        }
        protected override void OnLoad(EventArgs e)
        {
            Assert.ArgumentNotNull(e, "e");
            if (Sitecore.Context.ClientPage.IsEvent)
            {
                string str = Sitecore.Context.ClientPage.ClientRequest.Form[this.ID + "_value"];
                if (str != null)
                {
                    if (base.GetViewStateString("Value", string.Empty) != str)
                    {
                        TreeList.SetModified();
                    }
                    base.SetViewStateString("Value", str);
                }
            }
            base.OnLoad(e);
        }
        //private string SanitizeValues(Item sourceItem, string value)
        //{
        //    var db = GetDatabase();
        //    if (value == null || String.IsNullOrEmpty(value.Trim())) return String.Empty;
        //    var ids = value.Split('|');
        //    var validItems = new List();
        //    for (int i = 0; i < ids.Length; i++)
        //    {
        //        var item = db.GetItem(new ID(ids[i]));
        //        if (item.Axes.IsDescendantOf(sourceItem))
        //            validItems.Add(item);
        //    }
        //    return String.Join("|", validItems.ConvertAll((x) => x.ID.ToString()));
        //}
        private bool SourceContainsDataSource()
        {
            return this.Source.ToLower().Trim().StartsWith("datasource=") || this.Source.ToLower().Contains("&datasource=");
        }
        private string GetDataSourceField()
        {
            return StringUtil.ExtractParameter("DataSourceField", Source).Trim().ToLower();
        }
        public new string DataSource { get { return StringUtil.ExtractParameter("DataSource", Source).Trim().ToLower(); } }

        private string GetSourceFromField(string fieldName)
        {
            if (String.IsNullOrEmpty(fieldName)) return String.Empty;
            Item item = CurrentItem();
            if (item == null) return String.Empty;
            Field field = item.Fields[fieldName];
            if (field == null) return String.Empty;
            string fieldValue = field.GetValue(true);
            if (fieldValue == null) return String.Empty;
            return fieldValue;
        }

        private Item CurrentItem()
        {
            return Sitecore.Context.ContentDatabase.GetItem(new ID(base.ItemID));
        }

        private bool IsPathOrGuid(string fieldValue)
        {
            return Sitecore.Data.ID.IsID(fieldValue) || fieldValue.StartsWith("/", StringComparison.OrdinalIgnoreCase);
        }
        private Item ResolveItem(string fieldSource)
        {
            var db = GetDatabase();
            Assert.ArgumentNotNull(db, "Database");
            if (db == null) return null;
            if (Sitecore.Data.ID.IsID(fieldSource))
                return db.GetItem(new ID(fieldSource));
            if (fieldSource.StartsWith("/", StringComparison.OrdinalIgnoreCase))
                return db.GetItem(fieldSource);
            return null;
        }
        private new Database GetDatabase()
        {
            return Sitecore.Context.ContentDatabase;
        }
       
    }
}