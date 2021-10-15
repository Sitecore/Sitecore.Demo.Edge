using Sitecore.Data.Fields;
using Sitecore.Shell.Applications.ContentEditor;

namespace Sitecore.Demo.Edge.Website.CustomFields
{
    public class CmpMultiList : TreeList
    {

        public CmpMultiList()
        {
            this.Class = "scContentControl scContentControlTreelist";
        }

        public CmpMultiList(Field innerField) : this()
        {
        }

    }
}
