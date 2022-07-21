using Sitecore.Pipelines.Save;
using Sitecore.Data;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.Xml;
using System.Xml;
using System.Text.RegularExpressions;

namespace Sitecore.Demo.Edge.Website.Pipelines
{
    public class ParseXml : Sitecore.Pipelines.Save.ParseXml
    {
        public new void Process(SaveArgs args)
        {
            Assert.ArgumentNotNull((object)args, nameof(args));
            XmlDocument xml = args.Xml;
            Assert.IsNotNull((object)xml, "Missing XML for saving item");
            XmlDocument node1 = new XmlDocument();
            XmlNode node2 = XmlUtil.AddElement("sitecore", (XmlNode)node1);
            XmlNodeList xmlNodeList1 = xml.SelectNodes("/sitecore/field");
            Assert.IsNotNull((object)xmlNodeList1, "/sitecore/field");
            foreach (XmlNode node3 in xmlNodeList1)
            {
                string attribute1 = XmlUtil.GetAttribute("itemid", node3);
                string attribute2 = XmlUtil.GetAttribute("language", node3);
                string attribute3 = XmlUtil.GetAttribute("version", node3);
                string attribute4 = XmlUtil.GetAttribute("itemrevision", node3);
                string attribute5 = XmlUtil.GetAttribute("fieldid", node3);
                string childValue = XmlUtil.GetChildValue("value", node3);
                childValue = Regex.Replace(childValue, @"&t=[a-zA-Z]*", string.Empty);
                XmlNode node4 = node1.SelectSingleNode("/sitecore/item[@itemid='" + attribute1 + "' and @language='" + attribute2 + "' and @version='" + attribute3 + "']");
                if (node4 == null)
                {
                    node4 = XmlUtil.AddElement("item", node2);
                    XmlUtil.SetAttribute("itemid", attribute1, node4);
                    XmlUtil.SetAttribute("language", attribute2, node4);
                    XmlUtil.SetAttribute("version", attribute3, node4);
                    XmlUtil.SetAttribute("itemrevision", attribute4, node4);
                }
                XmlNode node5 = XmlUtil.AddElement("field", node4);
                XmlUtil.SetAttribute("fieldid", attribute5, node5);
                XmlUtil.SetValue(childValue, node5);
            }
            XmlNodeList xmlNodeList2 = node1.SelectNodes("/sitecore/item");
            Assert.IsNotNull((object)xmlNodeList2, "/sitecore/item");
            SaveArgs.SaveItem[] saveItemArray = new SaveArgs.SaveItem[xmlNodeList2.Count];
            for (int i1 = 0; i1 < xmlNodeList2.Count; ++i1)
            {
                XmlNode node6 = xmlNodeList2[i1];
                XmlNodeList xmlNodeList3 = node6.SelectNodes("field");
                Assert.IsNotNull((object)xmlNodeList3, "field");
                SaveArgs.SaveItem saveItem = new SaveArgs.SaveItem()
                {
                    ID = ID.Parse(XmlUtil.GetAttribute("itemid", node6)),
                    Version = Version.Parse(XmlUtil.GetAttribute("version", node6)),
                    Language = Language.Parse(XmlUtil.GetAttribute("language", node6)),
                    Revision = XmlUtil.GetAttribute("itemrevision", node6),
                    Fields = new SaveArgs.SaveField[xmlNodeList3.Count]
                };
                for (int i2 = 0; i2 < xmlNodeList3.Count; ++i2)
                {
                    XmlNode node7 = xmlNodeList3[i2];
                    saveItem.Fields[i2] = new SaveArgs.SaveField()
                    {
                        ID = new ID(XmlUtil.GetAttribute("fieldid", node7)),
                        Value = XmlUtil.GetValue(node7)
                    };
                }
                saveItemArray[i1] = saveItem;
            }
            args.Items = saveItemArray;
        }
    }
}