using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Shell.Applications.ContentEditor;
using Sitecore.Text;
using Sitecore.Web.UI.HtmlControls;

namespace Sitecore.Demo.Edge.Website.CustomFields
{
    public class CmpMultiList : TreeList
    {

        public CmpMultiList()
        {
            Class = "scContentControl";
            Activation = true;
        }

        protected Listbox TreeListListBox
        {
            get
            {
                return typeof(TreeList).GetField("_listBox", BindingFlags.Instance | BindingFlags.NonPublic)
                    .GetValue(this) as Listbox;
            }
        }

        protected override void OnLoad(EventArgs args)
        {
            base.OnLoad(args);

            if (!Sitecore.Context.ClientPage.IsEvent)
            {
                foreach (var listItem in TreeListListBox.Items)
                {
                    var id = listItem.Value.Split(',')[1];
                    listItem.Value = id;
                    //var item = Sitecore.Context.ContentDatabase.GetItem(id);
                    //if (item != null)
                    //{
                    //    listItem.Value = item.Paths.Path;
                    //}
                }
            }
        }
    }
}
