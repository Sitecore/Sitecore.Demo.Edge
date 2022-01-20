using System;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Layouts;
using Sitecore.SecurityModel;

namespace Sitecore.Demo.Edge.Foundation.BranchPresets
{
    public static class LayoutHelper
    {
        /// <summary>
        ///     Helper method that loops over all Shared and Final renderings in all devices attached to an item and invokes a function on each of them. The function may request the deletion of the item
        ///     by returning a specific enum value.
        /// </summary>
        public static void ApplyActionToAllRenderings(Item item, Func<RenderingDefinition, RenderingActionResult> action)
        {
            ApplyActionToAllSharedRenderings(item, action);
            ApplyActionToAllFinalRenderings(item, action);
        }

        /// <summary>
        ///     Helper method that loops over all Shared renderings in all devices attached to an item and invokes a function on each of them. The function may request the deletion of the item
        ///     by returning a specific enum value.
        /// </summary>
        public static void ApplyActionToAllSharedRenderings(Item item, Func<RenderingDefinition, RenderingActionResult> action)
        {
            // NOTE: when dealing with layouts its important to get and set the field value with LayoutField.Get/SetFieldValue()
            // if you fail to do this you will not process layout deltas correctly and may instead override all fields (breaking full inheritance), 
            // or attempt to get the layout definition for a delta value, which will result in your wiping the layout details when they get saved.

            ApplyActionToAllRenderings(item, FieldIDs.LayoutField, action);
        }

        /// <summary>
        ///     Helper method that loops over all Final renderings in all devices attached to an item and invokes a function on each of them. The function may request the deletion of the item
        ///     by returning a specific enum value.
        /// </summary>
        public static void ApplyActionToAllFinalRenderings(Item item, Func<RenderingDefinition, RenderingActionResult> action)
        {
            // NOTE: when dealing with layouts its important to get and set the field value with LayoutField.Get/SetFieldValue()
            // if you fail to do this you will not process layout deltas correctly and may instead override all fields (breaking full inheritance), 
            // or attempt to get the layout definition for a delta value, which will result in your wiping the layout details when they get saved.

            ApplyActionToAllRenderings(item, FieldIDs.FinalLayoutField, action);
        }

        private static void ApplyActionToAllRenderings(Item item, ID fieldId, Func<RenderingDefinition, RenderingActionResult> action)
        {
            string currentLayoutXml = LayoutField.GetFieldValue(item.Fields[fieldId]);
            if (string.IsNullOrEmpty(currentLayoutXml)) return;

            var newXml = ApplyActionToLayoutXml(currentLayoutXml, action);

            // save a modified layout value if necessary
            if (newXml != null)
            {
                using (new SecurityDisabler())
                using (new EditContext(item))
                    LayoutField.SetFieldValue(item.Fields[fieldId], newXml);
            }
        }

        private static string ApplyActionToLayoutXml(string xml, Func<RenderingDefinition, RenderingActionResult> action)
        {
            LayoutDefinition layout = LayoutDefinition.Parse(xml);

            xml = layout.ToXml(); // normalize the output in case of any minor XML differences (spaces, etc)

            // loop over devices in the rendering
            for (int deviceIndex = layout.Devices.Count - 1; deviceIndex >= 0; deviceIndex--)
            {
                var device = layout.Devices[deviceIndex] as DeviceDefinition;

                if (device == null) continue;

                // loop over renderings within the device
                for (int renderingIndex = device.Renderings.Count - 1; renderingIndex >= 0; renderingIndex--)
                {
                    var rendering = device.Renderings[renderingIndex] as RenderingDefinition;

                    if (rendering == null) continue;

                    // run the action on the rendering
                    RenderingActionResult result = action(rendering);

                    // remove the rendering if the action method requested it
                    if (result == RenderingActionResult.Delete)
                        device.Renderings.RemoveAt(renderingIndex);
                }
            }

            string layoutXml = layout.ToXml();

            // save a modified layout value if necessary
            if (layoutXml != xml)
            {
                return layoutXml;
            }

            return null;
        }
    }
}
