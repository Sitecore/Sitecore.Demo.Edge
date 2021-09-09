using System;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Shell.Applications.ContentEditor;
using Sitecore.Web.UI.HtmlControls;
using Sitecore.Configuration;
using Sitecore.Globalization;
using Sitecore.Web.UI.Sheer;

namespace Sitecore.Demo.Edge.Website.CustomFields
{
    public class CmpMultiList : TreeList
    {
        public CmpMultiList()
        {
            this.ReadOnly = true;
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            if (!Sitecore.Context.ClientPage.IsEvent)
            {
                this.RestoreListbox();
            }
        }

        private void RestoreListbox()
        {
            Listbox listBox = this.FindControl(this.GetViewStateString("ID") + "_selected") as Listbox;

            string[] nameValues = this.Value.Split(new char[] {','}, StringSplitOptions.RemoveEmptyEntries);
            listBox.Controls.Clear();

            if (nameValues.Length > 0)
            {
                Database contentDatabase = Sitecore.Context.ContentDatabase;
                if (!string.IsNullOrEmpty(this.DatabaseName))
                {
                    contentDatabase = Factory.GetDatabase(this.DatabaseName);
                }

                for (int i = 0; i < nameValues.Length; i++)
                {
                    string name = nameValues[i].Trim();
                    if (!string.IsNullOrEmpty(name))
                    {
                        ListItem listItem = new ListItem
                        {
                            ID = Sitecore.Web.UI.HtmlControls.Control.GetUniqueID("I")
                        };
                        listBox.Controls.Add(listItem);
                        listItem.Value = listItem.ID + "|" + name;

                        Item item = contentDatabase.GetItem(this.Source + "/" + name);

                        if (item != null)
                        {
                            listItem.Header = item.DisplayName;
                        }
                        else
                        {
                            listItem.Header = name + ' ' + Translate.Text("[Item not found]");
                        }
                    }
                }
                SheerResponse.Refresh(listBox);
            }
        }
    }
}