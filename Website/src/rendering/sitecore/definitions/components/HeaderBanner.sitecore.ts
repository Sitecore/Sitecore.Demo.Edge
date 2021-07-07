// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the HeaderBanner component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
const HeaderBanner = function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'HeaderBanner',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'eyebrow', type: CommonFieldTypes.SingleLineText },
      { name: 'title', type: CommonFieldTypes.SingleLineText },
      { name: 'subtitle', type: CommonFieldTypes.SingleLineText },
      { name: 'backgroundImage', type: CommonFieldTypes.Image },
    ],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
};

export default HeaderBanner;
