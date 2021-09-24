using System;
using Sitecore.Shell.Applications.ContentEditor;

namespace Sitecore.Demo.Edge.Website.CustomFields
{
    public sealed class CmpMultiList : TreeList
    {
        public CmpMultiList()
        {
            this.Class = "scContentControl scContentControlTreelist";
            this.Activation = true;
            this.ReadOnly = false;
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
        }
    }
}