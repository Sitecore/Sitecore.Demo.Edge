// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Section component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'Section',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'cssClass', type: CommonFieldTypes.SingleLineText },
      { name: 'brightness', type: CommonFieldTypes.SingleLineText },
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'content', type: CommonFieldTypes.SingleLineText },
      { name: 'callToActionText', type: CommonFieldTypes.SingleLineText },
    ],
    placeholders: ['jss-section-content'],
  });
}
