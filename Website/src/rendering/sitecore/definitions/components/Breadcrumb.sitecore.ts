// eslint-disable-next-line no-unused-vars
import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Breadcrumb component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
const Breadcrumb = function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'Breadcrumb',
    icon: SitecoreIcon.ArrowRight,
  });
};

export default Breadcrumb;
