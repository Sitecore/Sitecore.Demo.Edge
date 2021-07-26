// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the ThreeColumnCta component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
const ThreeColumnCta = function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'ThreeColumnCta',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'leftHeading', type: CommonFieldTypes.SingleLineText },
      { name: 'leftDescription', type: CommonFieldTypes.SingleLineText },
      { name: 'middleHeading', type: CommonFieldTypes.SingleLineText },
      { name: 'middleDescription', type: CommonFieldTypes.SingleLineText },
      { name: 'rightHeading', type: CommonFieldTypes.SingleLineText },
      { name: 'rightDescription', type: CommonFieldTypes.SingleLineText },
    ],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
};

export default ThreeColumnCta;
