using System;
using Sitecore.Diagnostics;
using Sitecore.Shell.Applications.ContentEditor;

namespace Sitecore.Demo.Edge.Website.CustomFields
{
    public sealed class CmpMultiList : TreeList
    {
        public CmpMultiList()
        {
            this.ReadOnly = false;
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
        }
    }
}