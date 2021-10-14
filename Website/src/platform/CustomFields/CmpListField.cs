using Sitecore.Data.Fields;

namespace Sitecore.Demo.Edge.Website.CustomFields
{
    public class CmpMultiList : MultilistField
    {
        public CmpMultiList(Field innerField) : base(innerField)
        {
        }
    }
}