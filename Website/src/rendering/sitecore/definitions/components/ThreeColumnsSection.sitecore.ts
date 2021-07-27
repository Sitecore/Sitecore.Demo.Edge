// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the ThreeColumnsSection component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
const ThreeColumnsSection = function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'ThreeColumnsSection',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'Title', type: CommonFieldTypes.SingleLineText },
      { name: 'Subtitle', type: CommonFieldTypes.SingleLineText },
      { name: 'LeftLogo', type: CommonFieldTypes.Image },
      { name: 'LeftTitle', type: CommonFieldTypes.SingleLineText },
      { name: 'LeftLink', type: CommonFieldTypes.GeneralLink },
      { name: 'MiddleLogo', type: CommonFieldTypes.Image },
      { name: 'MiddleTitle', type: CommonFieldTypes.SingleLineText },
      { name: 'MiddleLink', type: CommonFieldTypes.GeneralLink },
      { name: 'RightLogo', type: CommonFieldTypes.Image },
      { name: 'RightTitle', type: CommonFieldTypes.SingleLineText },
      { name: 'RightLink', type: CommonFieldTypes.GeneralLink },
    ],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
};

export default ThreeColumnsSection;
