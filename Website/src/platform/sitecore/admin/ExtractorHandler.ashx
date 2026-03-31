<%@ WebHandler Language="C#" Class="ExtractorHandler" Debug="true" %>
using System;
using System.IO;
using System.Web;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;

using Newtonsoft.Json;
using HtmlAgilityPack;

using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Data.Fields;
using Sitecore.Data.Managers;
using Sitecore.Globalization;

/// <summary>
/// Summary description for ExtractorHandler
/// </summary>
public class ExtractorHandler : IHttpHandler
{
    protected const string RENDERING_HINT = "__Renderings";
    protected const string FINAL_RENDERING_HINT = "__Final Renderings";

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/json";
        var requestQueries = context.Request.QueryString;
        string action = requestQueries["action"] ?? string.Empty;
        string database = string.IsNullOrEmpty(requestQueries["db"]) ? "master" : requestQueries["db"].ToString();
        string language = string.IsNullOrEmpty(requestQueries["lang"]) ? "en" : requestQueries["lang"].ToString();
        string deviceName = string.IsNullOrEmpty(requestQueries["deviceName"]) ? "Default" : requestQueries["deviceName"].ToString();

        try
        {
            switch (action.ToLowerInvariant())
            {
                case "getuserticket":
                    var ticket = GetUserTicket(requestQueries["username"]);
                    var cookie = new HttpCookie("sitecore_userticket", ticket);
                    cookie.HttpOnly = true;
                    cookie.Secure = true;
                    cookie.Path = "/";
                    context.Response.Cookies.Add(cookie);
                    break;
                case "getallsitenames":
                    context.Response.Write(GetAllSiteNames());
                    break;
                case "getalllanguages":
                    context.Response.Write(GetAllLanguages(database));
                    break;
                case "getsitedescendantids":
                    context.Response.Write(GetSiteDescendantIds(requestQueries["siteName"], language, database));
                    break;
                case "parsehtml":
                    string htmlContent = string.Empty;
                    var requestContentType = context.Request.ContentType;
                    var requestContentLength = context.Request.ContentLength;
                    if (context.Request.InputStream.CanRead && context.Request.ContentLength > 0)
                    {
                        using (StreamReader reader = new StreamReader(context.Request.InputStream))
                        {
                            htmlContent = reader.ReadToEnd();
                        }
                    }
                    context.Response.Write(ParseHTML(htmlContent, requestQueries["id"], requestQueries["sitePath"], language, database, deviceName, requestQueries["skipExpandedRendering"]));
                    break;
                default:
                    context.Response.StatusCode = 404;
                    break;
            }
        } catch (InputException ex)
        {
            context.Response.StatusCode = 400;
            context.Response.Write(ex.Message);
        } catch (Exception ex)
        {
            context.Response.StatusCode = 500;
            context.Response.Write(ex.Message);
        }
    }

    public string GetAllSiteNames()
    {
        var allSites = Sitecore.Configuration.Factory.GetSiteInfoList()
            .Where(site => !string.IsNullOrEmpty(site.Name) && !IsInternal(site.Name))
            .Select(site => site.Name)
            .ToList();

        return JsonConvert.SerializeObject(allSites, Formatting.Indented);
    }

    private bool IsInternal(string siteName)
    {
        // List from https://dev.azure.com/Sitecore-PD/Products/_search?action=contents&text=isInternal%3D%22true%22&type=code&lp=code-Project&filters=ProjectFilters%7BProducts%7D&pageSize=25&result=DefaultCollection/Products/Sitecore.DevEx/GBmaster//testFramework/CMSSetup/App_Config/Include/DevExTests/General/Services.GraphQL.Management.Site.config
        var internalSitesList = new List<string>()
        {
            "shell",
            "login",
            "admin",
            "service",
            "modules_website",
            "modules_shell",
            "scheduler",
            "system",
            "publisher",
            "exm",
            "graphqlapi",
            "graphqlapimanagement",
            "form",
            "jssglobalizationapi",
            "graphqlContentSchema",
        };
        return internalSitesList.Contains(siteName);
    }

    public string GetAllLanguages(string database)
    {
        var db = Sitecore.Configuration.Factory.GetDatabase(database);
        var allLanguages = LanguageManager.GetLanguages(db)
            .Select(l => l.Name)
            .ToList();

        return JsonConvert.SerializeObject(allLanguages, Formatting.Indented);
    }

    #region GetSiteDescendantIds
    public string GetSiteDescendantIds(string siteName, string language, string database)
    {
        if(string.IsNullOrEmpty(siteName))
        {
            throw new InputException("siteName must be provided");
        }
        var db = Sitecore.Configuration.Factory.GetDatabase(database);
        var languageItem = Sitecore.Globalization.Language.Parse(language);

        var site = Sitecore.Configuration.Factory.GetSite(siteName);
        if (site != null)
        {
            var siteInfo = site.SiteInfo;
            var siteItem = db.GetItem(siteInfo.RootPath, languageItem);
            if(siteItem != null)
            {
                var siteObj = new SiteItem
                {
                    SiteName = siteName,
                    SitePath = siteItem.Paths.FullPath,
                    Language = language,
                    Database = database,
                    Descendants = GetDescendantsWithRootRendering(siteItem, languageItem)
                };
                return JsonConvert.SerializeObject(siteObj, Formatting.Indented);
            }
        }
        return JsonConvert.SerializeObject(null, Formatting.Indented);
    }

    private List<string> GetDescendantsWithRootRendering(Item item, Language languageItem)
    {
        // Use Sitecore's optimized Axes API for descendant traversal
        // This is significantly faster than manual traversal as it uses database-optimized queries
        var db = item.Database;
        var descendants = item.Axes.GetDescendants();
        // Convert to List for compatibility with existing code
        return descendants.Where( d =>
        {
            var child = db.GetItem(d.ID, languageItem);
            return child != null && child.Versions.Count > 0 && HasRootRendering(child);
        }
        ).Select(d => d.ID.ToString()).ToList();
    }

    private bool HasRootRendering(Item item)
    {
        if (item == null)
            return false;
        try
        {
            // Get the layout field
            var layoutField = item.Fields[Sitecore.FieldIDs.LayoutField];
            // Check if there's any layout definition
            return layoutField != null && !string.IsNullOrEmpty(layoutField.Value);
        }
        catch (Exception)
        {
            return false;
        }
    }
    #endregion

    #region ParseHTML
    public string ParseHTML(string htmlContent, string pageId, string sitePath, string language, string database, string deviceName, string skipExpandedRenderingQS)
    {
        bool skipExpandedRendering = true;
        #region inputValidations
        if (string.IsNullOrEmpty(htmlContent))
        {
            throw new InputException("htmlContent must be provided");
        }
        if (string.IsNullOrEmpty(pageId))
        {
            throw new InputException("id must be provided");
        }
        if (string.IsNullOrEmpty(sitePath))
        {
            throw new InputException("sitePath must be provided");
        }
        if (!string.IsNullOrEmpty(skipExpandedRenderingQS))
        {
            bool.TryParse(skipExpandedRenderingQS, out skipExpandedRendering);
        }
        #endregion

        var db = Sitecore.Configuration.Factory.GetDatabase(database);
        var languageItem = Sitecore.Globalization.Language.Parse(language);

        var item = db.GetItem(new ID(pageId), languageItem);

        if(item == null)
        {
            throw new InputException("item of id " + pageId + " is not found");
        }

        List<DeviceInfo> allDevices = GetAllDevices(db);
        DeviceInfo device = allDevices.FirstOrDefault(d => d.Name.Equals(deviceName, StringComparison.OrdinalIgnoreCase));
        if (device == null)
        {
            throw new InputException("device of name " +  deviceName + " is not found");
        }
        string deviceId = device.ID;

        var fields = GetFields(db, item, sitePath, 0, 5);
        var renderingFields = fields
            .Where(f => f.Hint == RENDERING_HINT)
            .FirstOrDefault();
        var renderingFieldValue = renderingFields != null ? renderingFields.Value : null;
        var finalRenderingFields = fields
            .Where(f => f.Hint == FINAL_RENDERING_HINT)
            .FirstOrDefault();
        var finalRenderingFieldValue = finalRenderingFields != null ? finalRenderingFields.Value : null;

        var partialDesignsRenderingFields = GetPartialDesignsRenderingFields(db, item, languageItem, sitePath);

        List<ExpandedItem> expandedPartialDesigns = null;
        var pageDesignField = fields.Where(f => f.Hint == "Page Design").FirstOrDefault();
        if (pageDesignField != null &&
            pageDesignField.ExpandedFieldsValue != null &&
            pageDesignField.ExpandedFieldsValue.Count > 0)
        {
            var pageDesignItem = pageDesignField.ExpandedFieldsValue[0];
            if (pageDesignItem != null && pageDesignItem.Fields != null)
            {
                var partialDesignsField = pageDesignItem.Fields.Where(f => f.Hint == "PartialDesigns").FirstOrDefault();
                if (partialDesignsField != null)
                {
                    expandedPartialDesigns = partialDesignsField.ExpandedFieldsValue;
                }
            }
        }

        // Generate output JSON file
        var pageObject = new PageObject
        {
            Version = item.Version.Number,
            PageId = new ID(pageId),
            PagePath = item.Paths.FullPath,
            SitePath = sitePath,
            ParentName = item.Parent.Name,
            ParentId = item.Parent.ID,
            Fields = fields,
            Renderings = GetRenderingsFromHtml(db, language, pageId, htmlContent, sitePath,  renderingFieldValue, finalRenderingFieldValue, deviceId, skipExpandedRendering, partialDesignsRenderingFields, expandedPartialDesigns),
            Template = GetTemplate(item)
        };

        return JsonConvert.SerializeObject(pageObject, Formatting.Indented);
    }

    private List<ItemRendering> GetRenderingsFromHtml(Database db, string language, string pageId, string pageHtml, string sitePath, string renderingFields, string finalRenderingFields, string deviceId, bool skipExpandedRendering, List<PartialDesignRenderingFields> partialDesignsRenderingFields, List<ExpandedItem> expandedPartialDesigns)
    {
        var renderings = new List<ItemRendering>();

        try
        {
            // Load HTML document from stream
            var doc = new HtmlDocument();
            doc.LoadHtml(pageHtml);
            // Find all code elements with chrometype="placeholder" or "rendering" and kind="open"
            var allCodeNodes = doc.DocumentNode
                .SelectNodes("//code[@type='text/sitecore' and (@chrometype='placeholder' or @chrometype='rendering')]")
                ?? new HtmlNodeCollection(null);

            Stack<HtmlNode> placeholderStack = new Stack<HtmlNode>();

            int previousDepth = 0;

            foreach (var element in allCodeNodes)
            {
                try
                {
                    if (element.GetAttributeValue("chrometype", "") == "rendering" && element.GetAttributeValue("kind", "") == "close")
                    {
                        continue;
                    }
                    // if it is placeholder, push to the stack
                    if (element.GetAttributeValue("chrometype", "") == "placeholder")
                    {
                        if (element.GetAttributeValue("kind", "") == "open")
                        {
                            placeholderStack.Push(element);
                        }
                        else
                        {
                            if (placeholderStack.Count > 0)
                                placeholderStack.Pop();
                        }
                        continue;
                    }

                    // Skip if stack is empty
                    if (placeholderStack.Count == 0)
                    {
                        continue;
                    }

                    var placeholder = placeholderStack.Peek();
                    // Extract JSON data from element content
                    string jsonContent;
                    if (element.InnerText == null)
                    {
                        continue;
                    }
                    jsonContent = element.InnerText.Trim();

                    if (string.IsNullOrEmpty(jsonContent))
                    {
                        continue;
                    }

                    // Parse JSON content
                    Dictionary<string, object> jsonObj = null;
                    try
                    {
                        jsonObj = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonContent);
                    }
                    catch (Exception)
                    {
                        // Skip invalid JSON
                        continue;
                    }

                    string contextItemUri = "";
                    string rawRenderingID = "";
                    string displayName = "";

                    if (jsonObj != null)
                    {
                        object value;

                        if (jsonObj.TryGetValue("contextItemUri", out value) && value != null)
                        {
                            contextItemUri = value.ToString();
                        }

                        if (jsonObj.TryGetValue("displayName", out value) && value != null)
                        {
                            displayName = value.ToString();
                        }

                        if (jsonObj.TryGetValue("custom", out value) && value != null)
                        {
                            // Check if value is JObject without pattern matching
                            if (value is Newtonsoft.Json.Linq.JObject)
                            {
                                var jObject = (Newtonsoft.Json.Linq.JObject)value;
                                var renderingIdToken = jObject["renderingID"];
                                if (renderingIdToken != null)
                                {
                                    rawRenderingID = renderingIdToken.ToString();
                                }
                            }
                        }
                    }

                    // Parse uid from id
                    var rawId = element.GetAttributeValue("id", "");

                    // Filter: Keep only elements with contextItemUri and renderingID
                    if (string.IsNullOrEmpty(contextItemUri) || string.IsNullOrEmpty(rawRenderingID) || string.IsNullOrEmpty(rawId))
                    {
                        continue;
                    }

                    var renderingID = ParseGUID(rawRenderingID);
                    // exclude rendering without rendering name
                    if("{" + renderingID + "}" == displayName)
                    {
                        continue;
                    }

                    var uid = new ID(ParseGUID(rawId)).ToString();
                    var parametersRaw = GetRenderingParametersRaw(uid, renderingFields, finalRenderingFields, deviceId, partialDesignsRenderingFields);
                    var rendering = new ItemRendering
                    {
                        UID = uid,
                        RenderingId = new ID(renderingID).ToString(),
                        RenderingName = displayName,
                        ParametersRaw = parametersRaw,
                        Parameters = ParsePageParametersRaw(parametersRaw),
                        Placeholder = GetPlaceholderHierachy(placeholder),
                        Datasource = GetDataSource(db, pageId, contextItemUri),
                        ExpandedRendering = skipExpandedRendering ? null : GetExpandedItem(db, language, renderingID, sitePath),
                    };

                    //check if we toplevel rendering of partial design is skipped
                    if(rendering.Placeholder.Depth == 3 && previousDepth == 1)
                    {
                        var missingPathPart = rendering.Placeholder.Segments[1];
                        var missingRenderingPartialDesignName = missingPathPart.StartsWith("sxa-") ? missingPathPart.Substring("sxa-".Length) : missingPathPart;

                        ExpandedItem expandedPartialDesign = null;
                        try
                        {
                            if (expandedPartialDesigns != null)
                            {
                                expandedPartialDesign = expandedPartialDesigns
                                    .Where(epd => epd != null && epd.Fields != null && epd.Fields.Any(f => f != null && f.Hint == "Signature" && f.Value == missingRenderingPartialDesignName))
                                    .FirstOrDefault();
                            }
                        }
                        catch
                        {
                            ;
                        }

                        if(expandedPartialDesign != null)
                        {
                            var missingRenderingPlaceholderSegments = new string[] { rendering.Placeholder.Segments[0], rendering.Placeholder.Segments[1] };
                            var topLevelRenderings = GetTopLevelRenderingsFromPartialDesign(expandedPartialDesign, deviceId, db, language, sitePath, skipExpandedRendering);

                            foreach(ItemRendering topLevelRendering in topLevelRenderings)
                            {
                                //caclulate placeholder for top level renderings of partial design
                                topLevelRendering.Placeholder = new Placeholder
                                {
                                    Path = string.Join("/", missingRenderingPlaceholderSegments),
                                    Segments = missingRenderingPlaceholderSegments,
                                    Depth = 2
                                };
                                renderings.Add(topLevelRendering);
                            }
                        }
                    }

                    renderings.Add(rendering);
                    previousDepth = rendering.Placeholder.Depth;
                }
                catch
                {
                    // Skip elements that cause errors
                    continue;
                }
            }
        }
        catch (Exception ex)
        {
            throw new Exception("Error parsing HTML file: " + ex.Message);
        }

        return renderings;
    }

    private static Placeholder GetPlaceholderHierachy(HtmlNode placeholder)
    {
        var path = placeholder.GetAttributeValue("key", "");
        var segments = path.TrimStart('/').Split('/');

        return new Placeholder
        {
            Path = path,
            Segments = segments,
            Depth = segments.Length
        };
    }

    private static string ParseGUID(string rawId)
    {
        // uid is in format of r_<guid without dash>
        // remove the r_, format it into guid
        if (rawId.StartsWith("r_"))
        {
            rawId = rawId.Substring(2);
        }
        // change xxxxxx into xxxx-xxxx-xxxx-xxxx-xxxx
        if (rawId.Length == 32)
        {
            rawId = rawId.Substring(0, 8) + "-" + rawId.Substring(8, 4) + "-" + rawId.Substring(12, 4) + "-" + rawId.Substring(16, 4) + "-" + rawId.Substring(20, 12);
        }
        // if it is 36, it is already in guid format
        return rawId;
    }

    private string GetRenderingParametersRaw(string uid, string renderingValue, string finalRenderingValue, string deviceId, List<PartialDesignRenderingFields> partialDesignsRenderingFields)
    {
        // First, try to get rendering parameters from the page's "Rendering" and "Final Rendering" fields
        var parametersRaw = GetRenderingParametersFromFields(uid, renderingValue, finalRenderingValue, deviceId);

        // If not found, try to get from "Partial Designs"
        if (string.IsNullOrEmpty(parametersRaw))
        {
            parametersRaw = GetRenderingParametersFromPartialDesigns(uid, deviceId, partialDesignsRenderingFields);
        }

        return parametersRaw;
    }

    private string GetRenderingParametersFromFields(string uid, string renderingValue, string finalRenderingValue, string deviceId)
    {
        if (string.IsNullOrEmpty(renderingValue) && string.IsNullOrEmpty(finalRenderingValue))
        {
            return string.Empty;
        }

        HtmlNode renderingDeviceNode = null;
        HtmlNode finalRenderingDeviceNode = null;

        // Only process finalRenderingValue if it's not empty
        if (!string.IsNullOrEmpty(finalRenderingValue))
        {
            var finalRenderingDoc = new HtmlDocument();
            finalRenderingDoc.LoadHtml(finalRenderingValue);
            finalRenderingDeviceNode = finalRenderingDoc.DocumentNode.SelectSingleNode("//d[@id='" + deviceId + "']");
        }

        // Only process renderingValue if it's not empty
        if (!string.IsNullOrEmpty(renderingValue))
        {
            var renderingDoc = new HtmlDocument();
            renderingDoc.LoadHtml(renderingValue);
            renderingDeviceNode = renderingDoc.DocumentNode.SelectSingleNode("//d[@id='" + deviceId + "']");
        }

        if (renderingDeviceNode == null && finalRenderingDeviceNode == null)
        {
            return string.Empty;
        }

        HtmlNode rNode = null;

        // Search in Final Renderings first
        if (finalRenderingDeviceNode != null)
        {
            rNode = finalRenderingDeviceNode.SelectSingleNode("//r[@uid='" + uid + "']");
        }

        // If not found, search in Renderings
        if (rNode == null && renderingDeviceNode != null)
        {
            rNode = renderingDeviceNode.SelectSingleNode("//r[@uid='" + uid + "']");
        }

        if (rNode == null)
        {
            return string.Empty;
        }

        var parNode = rNode.Attributes["s:par"] ?? rNode.Attributes["par"];
        if (parNode == null)
        {
            return string.Empty;
        }

        return parNode.Value;
    }

    private List<PartialDesignRenderingFields> GetPartialDesignsRenderingFields(Database db, Item pageItem, Language languageItem, string sitePath)
    {
        var result = new List<PartialDesignRenderingFields>();

        try
        {
            if (pageItem == null)
            {
                return result;
            }

            // Get the Page Design field value
            var pageDesignField = pageItem.Fields["Page Design"];
            string pageDesignId = string.Empty;

            if (pageDesignField != null && !string.IsNullOrEmpty(pageDesignField.Value))
            {
                pageDesignId = pageDesignField.Value.Replace("{", "").Replace("}", "");
            }

            // Get Page Design item
            Item pageDesignItem = null;
            if (!string.IsNullOrEmpty(pageDesignId))
            {
                pageDesignItem = db.GetItem(new ID(pageDesignId), languageItem);
            }

            // If pageDesignItem is null, try to get it from Page Design fallback (mapping between Template ID and Page Design ID)
            if (pageDesignItem == null)
            {
                var fallbackPageDesignId = GetPageDesignFallback(db, pageItem, sitePath);
                if (!string.IsNullOrEmpty(fallbackPageDesignId))
                {
                    pageDesignId = fallbackPageDesignId.Replace("{", "").Replace("}", "");
                    pageDesignItem = db.GetItem(new ID(pageDesignId), languageItem);
                }
            }

            // If still null after fallback, return empty result
            if (pageDesignItem == null)
            {
                return result;
            }

            // Get Partial Design field value
            var partialDesignField = pageDesignItem.Fields["PartialDesigns"];
            if (partialDesignField == null || string.IsNullOrEmpty(partialDesignField.Value))
            {
                return result;
            }

            // Split the Partial Design GUIDs
            var partialDesignGuids = partialDesignField.Value.Split('|')
                .Select(g => g.Replace("{", "").Replace("}", "").Trim())
                .Where(g => !string.IsNullOrEmpty(g))
                .ToList();

            // Loop through each Partial Design and get rendering fields
            foreach (var partialDesignGuid in partialDesignGuids)
            {
                var partialDesignItem = db.GetItem(new ID(partialDesignGuid), languageItem);
                if (partialDesignItem == null)
                {
                    continue;
                }

                // Get "Renderings" and "Final Renderings" from Partial Design
                var renderingField = partialDesignItem.Fields[RENDERING_HINT];
                var finalRenderingField = partialDesignItem.Fields[FINAL_RENDERING_HINT];

                string renderingValue = (renderingField != null && !string.IsNullOrEmpty(renderingField.Value)) ? renderingField.Value : null;
                string finalRenderingValue = (finalRenderingField != null && !string.IsNullOrEmpty(finalRenderingField.Value)) ? finalRenderingField.Value : null;

                // Get all Base Partial Design rendering fields in inheritance chain (max depth 5)
                var basePartialDesigns = GetBasePartialDesignsRenderingFields(db, partialDesignItem, languageItem, maxDepth: 5);

                // Add to result if there are any rendering fields (from either Partial Design or Base Partial Designs)
                if (!string.IsNullOrEmpty(renderingValue) || !string.IsNullOrEmpty(finalRenderingValue) || basePartialDesigns.Count > 0)
                {
                    result.Add(new PartialDesignRenderingFields
                    {
                        RenderingValue = renderingValue,
                        FinalRenderingValue = finalRenderingValue,
                        BasePartialDesigns = basePartialDesigns
                    });
                }
            }
        }
        catch (Exception)
        {
            return result;
        }

        return result;
    }

    private List<BasePartialDesignRenderingFields> GetBasePartialDesignsRenderingFields(Database db, Item partialDesignItem, Language languageItem, int maxDepth, int currentDepth = 0)
    {
        var result = new List<BasePartialDesignRenderingFields>();

        // Stop if we've reached maximum depth to prevent infinite loops
        if (currentDepth >= maxDepth || partialDesignItem == null)
        {
            return result;
        }

        try
        {
            // Get the "Base partial design" field
            var basePartialDesignField = partialDesignItem.Fields["Base partial design"];
            if (basePartialDesignField == null || string.IsNullOrEmpty(basePartialDesignField.Value))
            {
                return result;
            }

            // Get the Base Partial Design item
            var basePartialDesignId = basePartialDesignField.Value.Replace("{", "").Replace("}", "");
            var basePartialDesignItem = db.GetItem(new ID(basePartialDesignId), languageItem);

            if (basePartialDesignItem == null)
            {
                return result;
            }

            // Get "Renderings" and "Final Renderings" from this Base Partial Design
            var renderingField = basePartialDesignItem.Fields[RENDERING_HINT];
            var finalRenderingField = basePartialDesignItem.Fields[FINAL_RENDERING_HINT];

            string renderingValue = (renderingField != null && !string.IsNullOrEmpty(renderingField.Value)) ? renderingField.Value : null;
            string finalRenderingValue = (finalRenderingField != null && !string.IsNullOrEmpty(finalRenderingField.Value)) ? finalRenderingField.Value : null;

            // Add current Base Partial Design if it has rendering fields
            if (!string.IsNullOrEmpty(renderingValue) || !string.IsNullOrEmpty(finalRenderingValue))
            {
                result.Add(new BasePartialDesignRenderingFields
                {
                    RenderingValue = renderingValue,
                    FinalRenderingValue = finalRenderingValue
                });
            }

            // Recursively get the next level of Base Partial Designs
            var nestedBasePartialDesigns = GetBasePartialDesignsRenderingFields(db, basePartialDesignItem, languageItem, maxDepth, currentDepth + 1);
            result.AddRange(nestedBasePartialDesigns);
        }
        catch (Exception)
        {
            return result;
        }

        return result;
    }

    private List<ItemRendering> GetTopLevelRenderingsFromPartialDesign(ExpandedItem expandedPartialDesign, string deviceId, Database db, string language, string sitePath, bool skipExpandedRendering)
    {
        var renderings = new List<ItemRendering>();

        if (expandedPartialDesign == null || expandedPartialDesign.Fields == null)
        {
            return renderings;
        }

        // Get the __Final Renderings field
        var finalRenderingField = expandedPartialDesign.Fields
            .Where(f => f.Hint == FINAL_RENDERING_HINT)
            .FirstOrDefault();

        // Get the __Renderings field
        var renderingField = expandedPartialDesign.Fields
            .Where(f => f.Hint == RENDERING_HINT)
            .FirstOrDefault();

        string finalRenderingValue = finalRenderingField != null ? finalRenderingField.Value : null;
        string renderingValue = renderingField != null ? renderingField.Value : null;

        // Extract renderings from fields (prioritize Final Renderings)
        if (!string.IsNullOrEmpty(finalRenderingValue))
        {
            renderings.AddRange(ExtractTopLevelRenderingsFromFieldXml(db, language, sitePath, finalRenderingValue, deviceId, skipExpandedRendering));
        }

        if (!string.IsNullOrEmpty(renderingValue))
        {
            var existingUids = new HashSet<string>(renderings.Select(r => r.UID));
            var additionalRenderings = ExtractTopLevelRenderingsFromFieldXml(db, language, sitePath, renderingValue, deviceId, skipExpandedRendering);
            foreach (var rendering in additionalRenderings)
            {
                if (!existingUids.Contains(rendering.UID))
                {
                    renderings.Add(rendering);
                }
            }
        }

        return renderings;
    }

    private List<ItemRendering> ExtractTopLevelRenderingsFromFieldXml(Database db, string language, string sitePath, string fieldXml, string deviceId, bool skipExpandedRendering)
    {
        var renderings = new List<ItemRendering>();

        try
        {
            if (string.IsNullOrEmpty(fieldXml))
            {
                return renderings;
            }

            var doc = new HtmlDocument();
            doc.LoadHtml(fieldXml);

            // Find the device node - try both id and s:id attributes
            var deviceNode = doc.DocumentNode.SelectSingleNode("//d[@id='" + deviceId + "']");
            if (deviceNode == null)
            {
                deviceNode = doc.DocumentNode.SelectSingleNode("//d[@s:id='" + deviceId + "']");
            }
            if (deviceNode == null)
            {
                return renderings;
            }

            // Get all rendering nodes for this device
            var renderingNodes = deviceNode.SelectNodes(".//r");
            if (renderingNodes == null || renderingNodes.Count == 0)
            {
                return renderings;
            }

            foreach (var rNode in renderingNodes)
            {
                try
                {
                    // Try both prefixed (s:ph) and non-prefixed (ph) attributes
                    var placeholderPath = rNode.GetAttributeValue("s:ph", "") ?? rNode.GetAttributeValue("ph", "");

                    // Normalize path by removing leading slashes and backslashes
                    var normalizedPath = placeholderPath.TrimStart('/', '\\');
                    var placeholderSegments = normalizedPath.Split(new[] { '/', '\\' }, StringSplitOptions.RemoveEmptyEntries);

                    // Only get top-level renderings (single segment: e.g., "main" from "main", "/main", or "\main")
                    if (placeholderSegments.Length != 1)
                    {
                        continue;
                    }

                    var uid = rNode.GetAttributeValue("uid", "");
                    // Try both prefixed (s:id) and non-prefixed (id) attributes
                    var renderingId = rNode.GetAttributeValue("s:id", "") ?? rNode.GetAttributeValue("id", "");
                    // Try both prefixed (s:ds) and non-prefixed (ds) attributes
                    var dataSourceRaw = rNode.GetAttributeValue("s:ds", "") ?? rNode.GetAttributeValue("ds", "");

                    if (string.IsNullOrEmpty(uid) || string.IsNullOrEmpty(renderingId))
                    {
                        continue;
                    }

                    // Get rendering name from the rendering item
                    var renderingItem = db.GetItem(new ID(renderingId), Sitecore.Globalization.Language.Parse(language));
                    string renderingName = renderingItem != null ? renderingItem.Name : "";

                    // Skip if no rendering name
                    if (string.IsNullOrEmpty(renderingName))
                    {
                        continue;
                    }

                    // Get parameters - try both prefixed (s:par) and non-prefixed (par) attributes
                    var parNode = rNode.Attributes["s:par"] ?? rNode.Attributes["par"];
                    string parametersRaw = parNode != null ? parNode.Value : string.Empty;

                    // Placeholder will be calculated outside this function
                    var placeholder = new Placeholder();

                    // Get datasource
                    DataSource datasource = null;
                    if (!string.IsNullOrEmpty(dataSourceRaw))
                    {
                        datasource = GetDataSource(db, "", dataSourceRaw);
                    }

                    // Get expanded rendering
                    ExpandedItem expandedRendering = null;
                    if (!skipExpandedRendering)
                    {
                        expandedRendering = GetExpandedItem(db, language, renderingId, sitePath);
                    }

                    var rendering = new ItemRendering
                    {
                        UID = uid,
                        RenderingId = renderingId,
                        RenderingName = renderingName,
                        ParametersRaw = parametersRaw,
                        Parameters = ParsePageParametersRaw(parametersRaw),
                        Placeholder = placeholder,
                        Datasource = datasource,
                        ExpandedRendering = expandedRendering
                    };

                    renderings.Add(rendering);
                }
                catch
                {
                    // Skip renderings that cause errors
                    continue;
                }
            }
        }
        catch (Exception)
        {
            // Return whatever we've extracted so far
        }

        return renderings;
    }

    private string GetRenderingParametersFromPartialDesigns(string uid, string deviceId, List<PartialDesignRenderingFields> partialDesignsRenderingFields)
    {
        // If no partial design fields were retrieved, return empty
        if (partialDesignsRenderingFields == null || partialDesignsRenderingFields.Count == 0)
        {
            return string.Empty;
        }

        try
        {
            // Loop through each Partial Design and look for rendering parameters
            foreach (var partialDesign in partialDesignsRenderingFields)
            {
                // First, try to get parameters from Partial Design's Rendering/Final Rendering fields
                var parametersRaw = GetRenderingParametersFromFields(uid, partialDesign.RenderingValue, partialDesign.FinalRenderingValue, deviceId);
                if (!string.IsNullOrEmpty(parametersRaw))
                {
                    return parametersRaw;
                }

                // If not found, loop through all Base Partial Designs in inheritance chain
                if (partialDesign.BasePartialDesigns != null && partialDesign.BasePartialDesigns.Count > 0)
                {
                    foreach (var basePartialDesign in partialDesign.BasePartialDesigns)
                    {
                        parametersRaw = GetRenderingParametersFromFields(uid, basePartialDesign.RenderingValue, basePartialDesign.FinalRenderingValue, deviceId);
                        if (!string.IsNullOrEmpty(parametersRaw))
                        {
                            return parametersRaw;
                        }
                    }
                }
            }
        }
        catch (Exception)
        {
            return string.Empty;
        }

        return string.Empty;
    }

    private static Dictionary<string, string> ParsePageParametersRaw(string parametersRaw)
    {
        var parameters = new Dictionary<string, string>();

        if (string.IsNullOrEmpty(parametersRaw))
        {
            return parameters;
        }

        // Decode HTML entities first (handles &amp; -> &)
        string decoded = System.Web.HttpUtility.HtmlDecode(parametersRaw);

        // Then decode URL-encoded string
        decoded = System.Web.HttpUtility.UrlDecode(decoded);

        // Replace literal "\u0026" with actual '&' character
        decoded = decoded.Replace("\\u0026", "&");

        // Split by '&'
        string[] pairs = decoded.Split('&');

        foreach (string pair in pairs)
        {
            if (string.IsNullOrWhiteSpace(pair)) continue;

            string[] kv = pair.Split(new[] { '=' }, 2); // Split only on the first '='
            string key = kv[0].Trim();
            string value = kv.Length > 1 ? kv[1].Trim() : "";

            // Clean up curly braces from GUIDs
            value = value.Replace("{", "").Replace("}", "");

            parameters[key] = value;
        }

        return parameters;
    }

    private DataSource GetDataSource(Database db, string pageId, string rawDataSource)
    {
        if (string.IsNullOrEmpty(rawDataSource) || rawDataSource.Contains(pageId))
        {
            return null;
        }

        Item datasourceItem = null;

        // Handle "sitecore://" format
        var match = Regex.Match(
            rawDataSource,
            @"sitecore://(?<db>[^/]+)/\{(?<id>[^\}]+)\}(?:\?lang=(?<lang>[^&]+))?(?:&ver=(?<ver>[^&]+))?",
            RegexOptions.IgnoreCase
        );
        string language = match.Groups["lang"].Value;
        string ver = match.Groups["ver"].Value;

        var languageItem = Sitecore.Globalization.Language.Parse(language ?? "en");
        Sitecore.Data.Version version = Sitecore.Data.Version.Latest;
        Sitecore.Data.Version.TryParse(ver, out version);

        if (match.Success)
        {
            string id = match.Groups["id"].Value;
            string matchDb = match.Groups["db"].Value;
            var localDatasourceDatabase = Sitecore.Configuration.Factory.GetDatabase(matchDb);
            datasourceItem = localDatasourceDatabase.GetItem(new Sitecore.Data.ID(id), languageItem, version);
        }
        else if (rawDataSource.StartsWith("local:", StringComparison.OrdinalIgnoreCase))
        {
            // Handle "local:" format
            string relativePath = rawDataSource.Substring("local:".Length);
            string fullPath = Sitecore.Context.Item.Paths.FullPath + "/" + relativePath;
            datasourceItem = db.GetItem(fullPath, languageItem, version);
        }
        else
        {
            // Try direct path or ID
            datasourceItem = db.GetItem(rawDataSource, languageItem, version);
        }

        if (datasourceItem == null)
        {
            return new DataSource
            {
                Raw = rawDataSource,
            };
        }

        var fields = GetFields(db, datasourceItem, null, 0, 0);

        return new DataSource
        {
            Raw = rawDataSource,
            ID = datasourceItem.ID.ToString().Replace("{", "").Replace("}", ""),
            Path = datasourceItem.Paths.FullPath,
            Fields = fields
        };
    }

    private List<DeviceInfo> GetAllDevices(Database db)
    {
        List<DeviceInfo> devices = new List<DeviceInfo>();

        Item layoutRoot = db.GetItem("/sitecore/layout/Devices");

        if (layoutRoot != null)
        {
            foreach (Item child in layoutRoot.Children)
            {
                DeviceItem device = new DeviceItem(child);
                devices.Add(new DeviceInfo
                {
                    Name = device.Name,
                    ID = device.ID.ToString()
                });
            }
        }

        return devices;
    }

    private ExpandedItem GetExpandedItem(Database db, string language, string id, string sitePath = null, int depth = 0, int maxDepth = 5)
    {
        var languageItem = Sitecore.Globalization.Language.Parse(language ?? "en");
        Item item = db.GetItem(new ID(id), languageItem);
        if (item == null) return null;

        var fields = GetFields(db, item, sitePath, depth, maxDepth);

        return new ExpandedItem
        {
            ID = id,
            Path = item.Paths.FullPath,
            Fields = fields
        };
    }

    private List<ItemField> GetFields(Database db, Item item, string sitePath = null, int depth = 0, int maxDepth = 5)
    {
        // List of metadata fields to exclude
        var excludedFieldNames = new List<string>
        {
            "__Enable item fallback",
            "__Enforce version presence",
            "__Context Menu",
            "__Editor",
            "__Editors",
            "__Hidden",
            "__Icon",
            "__Originator",
            "__Read Only",
            "__Ribbon",
            "__Skin",
            "__Sortorder",
            "__Style",
            "__Subitems Sorting",
            "__Thumbnail",
            "__Help link",
            "__Long description",
            "__Short description",
            "__Controller Action",
            "__Controller",
            "__Presets",
            "__Renderers",
            "__Hide version",
            "__Valid from",
            "__Valid to",
            "__Boost",
            "__Boosting Rules",
            "__Facets",
            "__Masters",
            "__Bucket Parent Reference",
            "__Bucketable",
            "__Default Bucket Query",
            "__Default View",
            "__Enabled Views",
            "__Is Bucket",
            "__Persistent Bucket Filter",
            "__Quick Actions",
            "__Should Not Organize In Bucket",
            "__Never publish",
            "__Publish",
            "__Publishing groups",
            "__Unpublish",
            "__Owner",
            "__Security",
            "__Created by",
            "__Created",
            "__Revision",
            "__Updated by",
            "__Updated",
            "__Semantics",
            "__Archive date",
            "__Archive Version date",
            "__Reminder date",
            "__Reminder recipients",
            "__Reminder text",
            "__Quick Action Bar Validation Rules",
            "__Suppressed Validation Rules",
            "__Validate Button Validation Rules",
            "__Validator Bar Validation Rules",
            "__Workflow Validation Rules",
            "__Default workflow",
            "__Lock",
            "__Workflow state",
            "__Workflow",
            "__Version Name"
        };
        var fields = new List<ItemField>();
        foreach (TemplateFieldItem f in item.Template.Fields)
        {
            if (excludedFieldNames.Contains(f.Name))
                continue;

            string scope = f.Shared ? "shared" :
                f.Unversioned ? "unversioned:" + item.Language.Name :
                "versioned:" + item.Language.Name;

            var fieldValue = item[f.ID];

            // Handle empty "Page Design" field
            if (f.Name == "Page Design" && string.IsNullOrEmpty(fieldValue))
            {
                fieldValue = GetPageDesignFallback(db, item, sitePath);
            }

            fields.Add(new ItemField
            {
                ID = f.ID.ToString().Replace("{", "").Replace("}", ""),
                Hint = f.Name,
                Type = f.Type,
                Value = HttpUtility.HtmlDecode(fieldValue),
                Scope = scope,
                ExpandedFieldsValue = GetExpandedFieldsValue(db, item.Language.Name, fieldValue, sitePath, depth + 1, maxDepth)
            });
        }
        return fields;
    }

    private List<ExpandedItem> GetExpandedFieldsValue(Database db, string language, string fieldValue, string sitePath, int depth, int maxDepth)
    {
        var expandedItems = new List<ExpandedItem>();
        if (depth >= maxDepth || string.IsNullOrEmpty(fieldValue)) return null;

        var guids = fieldValue.Split('|')
            .Select(v => v.Replace("{", "").Replace("}", ""))
            .Where(v => {
                Guid tempGuid;
                return Guid.TryParse(v, out tempGuid);
            });

        foreach (var guid in guids)
        {
            expandedItems.Add(GetExpandedItem(db, language, guid, sitePath, depth + 1, maxDepth));
        }

        return expandedItems.Count > 0 ? expandedItems : null;
    }

    private ItemTemplate GetTemplate(Item item)
    {
        var template = item.Template;
        return new ItemTemplate
        {
            ID = template.ID.ToString(),
            Name = template.Name
        };
    }

    private string GetPageDesignFallback(Database db, Item item, string sitePath)
    {
        if (sitePath == null || string.IsNullOrEmpty(sitePath))
            return string.Empty;
        string pageDesignsPath = sitePath + "/Presentation/Page Designs";
        var pageDesignsRoot = db.GetItem(pageDesignsPath);
        if (pageDesignsRoot == null)
            return string.Empty;

        // Try to resolve from "Template to design mapping" field
        Field mappingField = pageDesignsRoot.Fields["TemplatesMapping"];
        if (mappingField != null && !string.IsNullOrEmpty(mappingField.Value))
        {
            // Decode twice to handle double-encoded values
            string decodedOnce = HttpUtility.UrlDecode(mappingField.Value);
            string decodedMapping = HttpUtility.UrlDecode(decodedOnce);
            string[] mappings = decodedMapping.Split('&');
            foreach (string map in mappings)
            {
                string[] parts = map.Split('=');
                if (parts.Length == 2)
                {
                    Sitecore.Data.ID templateId;
                    Sitecore.Data.ID designId;
                    bool templateParsed = Sitecore.Data.ID.TryParse(parts[0], out templateId);
                    bool designParsed = Sitecore.Data.ID.TryParse(parts[1], out designId);
                    if (templateParsed && designParsed && templateId == item.TemplateID)
                    {
                        return designId.ToString();
                    }
                }
            }
        }

        return string.Empty;
    }
    #endregion

    #region GetUserTicket
    public string GetUserTicket(string username)
    {
        if (string.IsNullOrEmpty(username))
        {
            throw new InputException("username must be provided");
        }

        var request = HttpContext.Current.Request;
        var baseUrl = request.Url.GetLeftPart(UriPartial.Authority);

        var ticket = Sitecore.Web.Authentication.TicketManager.CreateTicket(username, baseUrl, true);

        return ticket;
    }
    #endregion

    public bool IsReusable
    {
        get { return false; }
    }

}

public class SiteItem
{
    [JsonProperty("siteName")]
    public string SiteName { get; set; }
    [JsonProperty("sitePath")]
    public string SitePath { get; set; }
    [JsonProperty("language")]
    public string Language { get; set; }
    [JsonProperty("database")]
    public string Database { get; set; }
    [JsonProperty("descendants")]
    public List<string> Descendants { get; set; }
}

public class DeviceInfo
{
    [JsonProperty("name")]
    public string Name { get; set; }
    [JsonProperty("id")]
    public string ID { get; set; }
}

public class ItemField
{
    [JsonProperty("id")]
    public string ID { get; set; }
    [JsonProperty("hint")]
    public string Hint { get; set; }
    [JsonProperty("type")]
    public string Type { get; set; }
    [JsonProperty("value")]
    public string Value { get; set; }
    [JsonProperty("scope")]
    public string Scope { get; set; }
    [JsonProperty("expandedFieldsValue", NullValueHandling = NullValueHandling.Ignore)]
    public List<ExpandedItem> ExpandedFieldsValue { get; set; }
}

public class ExpandedItem
{
    [JsonProperty("id")]
    public string ID { get; set; }
    [JsonProperty("path")]
    public string Path { get; set; }
    [JsonProperty("fields")]
    public List<ItemField> Fields { get; set; }
}

public class PageObject
{
    [JsonProperty("version")]
    public int Version { get; set; }
    [JsonProperty("pageId")]
    public ID PageId { get; set; }
    [JsonProperty("pagePath")]
    public string PagePath { get; set; }
    [JsonProperty("sitePath")]
    public string SitePath { get; set; }
    [JsonProperty("parentName")]
    public string ParentName { get; set; }
    [JsonProperty("parentId")]
    public ID ParentId { get; set; }
    [JsonProperty("fields")]
    public List<ItemField> Fields { get; set; }
    [JsonProperty("renderings")]
    public List<ItemRendering> Renderings { get; set; }
    [JsonProperty("template")]
    public ItemTemplate Template { get; set; }
}

public class ItemTemplate
{
    [JsonProperty("id")]
    public string ID { get; set; }
    [JsonProperty("name")]
    public string Name { get; set; }
}

public class DataSource
{
    [JsonProperty("raw")]
    public string Raw { get; set; }
    [JsonProperty("id")]
    public string ID { get; set; }
    [JsonProperty("path")]
    public string Path { get; set; }
    [JsonProperty("fields")]
    public List<ItemField> Fields { get; set; }
}

public class ItemRendering
{
    [JsonProperty("uid")]
    public string UID { get; set; }
    [JsonProperty("renderingId")]
    public string RenderingId { get; set; }
    [JsonProperty("renderingName")]
    public string RenderingName { get; set; }
    [JsonProperty("parametersRaw")]
    public string ParametersRaw { get; set; }
    [JsonProperty("parameters")]
    public Dictionary<string, string> Parameters { get; set; }
    [JsonProperty("placeholder")]
    public Placeholder Placeholder { get; set; }
    [JsonProperty("datasource")]
    public DataSource Datasource { get; set; }
    [JsonProperty("expandedRendering", NullValueHandling = NullValueHandling.Ignore)]
    public ExpandedItem ExpandedRendering { get; set; }
}

public class Placeholder
{
    [JsonProperty("path")]
    public string Path { get; set; }
    [JsonProperty("segments")]
    public string[] Segments { get; set; }
    [JsonProperty("depth")]
    public int Depth { get; set; }
}

public class PartialDesignRenderingFields
{
    public string RenderingValue { get; set; }
    public string FinalRenderingValue { get; set; }
    public List<BasePartialDesignRenderingFields> BasePartialDesigns { get; set; }
}

public class BasePartialDesignRenderingFields
{
    public string RenderingValue { get; set; }
    public string FinalRenderingValue { get; set; }
}

public class InputException : Exception
{
    public InputException(string message) : base(message)
    {
    }
}