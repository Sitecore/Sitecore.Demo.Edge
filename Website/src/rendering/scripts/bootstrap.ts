import { generateConfig } from './generate-config';
// DEMO TEAM CUSTOMIZATION - Remove disconnected mode
/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

// DEMO TEAM CUSTOMIZATION - Remove disconnected mode
/*
  CONFIG GENERATION
  Generates the /src/temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
// DEMO TEAM CUSTOMIZATION - Remove disconnected mode
const configOverride: { [key: string]: string } = {};
// DEMO TEAM CUSTOMIZATION - Remove disconnected mode

generateConfig(configOverride);

/*
  COMPONENT FACTORY GENERATION
*/
import './generate-component-factory';

/*
   PLUGINS GENERATION
*/
import './generate-plugins';

/*
  DEMO TEAM CUSTOMIZATION
  Generates the /src/temp/categoriesData.ts file in order to be used
  by the CategoryBreadcrumb component
*/
import './generate-categories-data';
