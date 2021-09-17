using System;
using Sitecore.Shell.Applications.ContentEditor;

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
        }
    }
}