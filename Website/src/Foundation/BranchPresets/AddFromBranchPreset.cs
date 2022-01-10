using System;
using System.Linq;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Pipelines.ItemProvider.AddFromTemplate;
using Sitecore.StringExtensions;

namespace Sitecore.Demo.Edge.Foundation.BranchPresets
{
    /// <summary>
    /// Augments the functionality of Branch Templates by making any rendering data sources set in the layout on the branch
    /// that point to other children of the branch be repointed to the newly created branch item
    /// instead of the source branch item. This allows for templating including data source items using branches.
    /// </summary>
    public class AddFromBranchPreset : AddFromTemplateProcessor
    {
        public override void Process(AddFromTemplateArgs args)
        {
            Assert.ArgumentNotNull(args, nameof(args));

            if (AddFromTemplatePresetDisabler.IsActive)
            {
                return;
            }

            if (args.Destination.Database.Name != "master") return;

            var templateItem = args.Destination.Database.GetItem(args.TemplateId);

            Assert.IsNotNull(templateItem, "Template did not exist!");

            // if this isn't a branch template, we can use the stock behavior
            if (templateItem.TemplateID != TemplateIDs.BranchTemplate) return;

            Assert.HasAccess((args.Destination.Access.CanCreate() ? 1 : 0) != 0,
                "AddFromTemplate - Add access required (destination: {0}, template: {1})", args.Destination.ID,
                args.TemplateId);

            // Create the branch template instance
            var newItem = args.Destination.Database.Engines.DataEngine.AddFromTemplate(args.ItemName, args.TemplateId,
                args.Destination, args.NewId);

            // find all rendering data sources on the branch root item that point to an item under the branch template,
            // and repoint them to the equivalent subitem under the branch instance
            RewriteBranchRenderingDataSources(newItem, templateItem, newItem.Paths.FullPath);

            args.Result = newItem;
        }

        protected virtual void RewriteBranchRenderingDataSources(Item item, BranchItem branchTemplateItem,
            string branchRoot)
        {
            var branchBasePath = branchTemplateItem.InnerItem.Paths.FullPath;

            LayoutHelper.ApplyActionToAllRenderings(item, rendering =>
            {
                if (string.IsNullOrWhiteSpace(rendering.Datasource))
                    return RenderingActionResult.None;

                // note: queries and multiple item datasources are not supported
                var renderingTargetItem = item.Database.GetItem(rendering.Datasource);

                if (renderingTargetItem == null)
                    Log.Warn(
                        "Error while expanding branch template rendering datasources: data source {0} was not resolvable."
                            .FormatWith(rendering.Datasource), this);

                // if there was no valid target item OR the target item is not a child of the branch template we skip out
                if (renderingTargetItem == null ||
                    !renderingTargetItem.Paths.FullPath.StartsWith(branchBasePath, StringComparison.OrdinalIgnoreCase))
                    return RenderingActionResult.None;

                var relativeRenderingPath =
                    renderingTargetItem.Paths.FullPath.Substring(branchBasePath.Length).TrimStart('/');
                relativeRenderingPath =
                    relativeRenderingPath.Substring(relativeRenderingPath
                        .IndexOf('/')); // we need to skip the "/$name" at the root of the branch children

                var newTargetPath = item.Paths.FullPath + relativeRenderingPath;

                var newTargetItem = item.Database.GetItem(newTargetPath);

                // if the target item was a valid under branch item, but the same relative path does not exist under the branch instance
                // we set the datasource to something invalid to avoid any potential unintentional edits of a shared data source item
                if (newTargetItem == null)
                {
                    rendering.Datasource = "INVALID_BRANCH_SUBITEM_ID";
                    return RenderingActionResult.None;
                }

                rendering.Datasource = newTargetItem.ID.ToString();
                return RenderingActionResult.None;
            });

            if (!item.HasChildren) return;
            item.Children.ToList().ForEach(x => RewriteBranchRenderingDataSources(x, branchTemplateItem, branchRoot));
        }
    }
}
