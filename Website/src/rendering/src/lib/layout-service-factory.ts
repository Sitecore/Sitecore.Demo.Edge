import {
  LayoutService,
  GraphQLLayoutService,
  RestLayoutService,
  JSS_MODE_DISCONNECTED,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class LayoutServiceFactory {
  create(): LayoutService {
    // DEMO TEAM CUSTOMIZATION - Switch to REST endpoint if we are in disconnected mode
    if (process.env.JSS_MODE === JSS_MODE_DISCONNECTED) {
      return new RestLayoutService({
        apiHost: `http://localhost:${process.env.PROXY_PORT || 3042}`,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
      });
    }
    // END CUSTOMIZATION

    return new GraphQLLayoutService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
