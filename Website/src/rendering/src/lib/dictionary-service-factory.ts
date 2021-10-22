import {
  DictionaryService,
  GraphQLDictionaryService,
  RestDictionaryService,
  constants,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class DictionaryServiceFactory {
  create(): DictionaryService {
    // DEMO TEAM CUSTOMIZATION - Switch to REST endpoint if we are in disconnected mode
    if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
      return new RestDictionaryService({
        apiHost: `http://localhost:${process.env.PROXY_PORT || 3042}`,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
      });
    }
    // END CUSTOMIZATION

    return new GraphQLDictionaryService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      /*
      The Dictionary Service needs a root item ID in order to fetch dictionary phrases for the current
      app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
      otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
      rootItemId: '{GUID}'
      */
    });
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();
