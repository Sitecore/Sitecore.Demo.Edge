import { generateConfig } from './generate-config';
/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

/*
  CONFIG GENERATION
  Generates the /src/temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
const configOverride: { [key: string]: string } = {};

generateConfig(configOverride);

/*
  COMPONENT FACTORY GENERATION
*/
import './generate-component-factory';

/*
  DEMO TEAM CUSTOMIZATION
  Generates the /src/temp/categoriesData.ts file in order to be used
  by the CategoryBreadcrumb component
*/
import './generate-categories-data';
