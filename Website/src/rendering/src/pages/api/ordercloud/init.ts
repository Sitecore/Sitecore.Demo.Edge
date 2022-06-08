import { NextApiHandler } from 'next';
import {
  Addresses,
  ApiClients,
  ApprovalRules,
  Auth,
  Buyers,
  Configuration,
  IntegrationEvent,
  IntegrationEvents,
  OpenIdConnect,
  OpenIdConnects,
  SecurityProfiles,
  Tokens,
  UserGroups,
  Users,
} from 'ordercloud-javascript-sdk';
import {
  ANONYMOUS_USER_ID,
  PUBLIC_BUYER_ID,
  PUBLIC_LOCATION_ID_SUFFIX,
  PUBLIC_LOCATION_NAME,
  PUBLIC_HEADSTART_CATALOG_ID,
  PUBLIC_HEADSTART_CATALOG_NAME,
  PROFILED_BUYER_ID,
  PROFILED_LOCATION_ID_SUFFIX,
  PROFILED_LOCATION_NAME,
  PROFILED_HEADSTART_CATALOG_ID,
  PROFILED_HEADSTART_CATALOG_NAME,
  PRODUCTION_OPENID_CONNECT_ID,
  DEVELOPMENT_OPENID_CONNECT_ID,
} from '../../../constants/seeding';

const handler: NextApiHandler<unknown> = async (request, response) => {
  const middlewareClientID = request.query?.MiddlewareClientID as string;
  const middlewareClientSecret = request.query?.MiddlewareClientSecret as string;

  if (!middlewareClientID) {
    return response.status(400).json({ Error: 'Missing required parameter MiddlewareClientID' });
  }
  if (!middlewareClientSecret) {
    return response
      .status(400)
      .json({ Error: 'Missing required parameter MiddlewareClientSecret' });
  }

  try {
    // First we need to authenticate
    Configuration.Set({
      baseApiUrl: process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL,
    });
    const authResponse = await Auth.ClientCredentials(middlewareClientSecret, middlewareClientID, [
      'FullAccess',
    ]);
    Tokens.SetAccessToken(authResponse.access_token);

    // Ensure profiled buyer exists - for logged in users
    console.log('Getting profiled buyer');
    const profiledBuyer = await Buyers.Get(PROFILED_BUYER_ID);

    // Ensure public buyer exists
    console.log('Getting public buyer');
    const publicBuyer = await Buyers.Get(PUBLIC_BUYER_ID);

    // Ensure buyer client exists
    console.log('Ensuring buyer client exists');
    const buyerClients = await ApiClients.List({
      filters: { AppName: 'Default Buyer Storefront' },
    });
    const buyerClient = buyerClients.Items[0];
    if (!buyerClient) {
      return response.status(400).json({
        Error:
          'Buyer API client with the name "Default Buyer Storefront" not found, please ensure headstart was seeded',
      });
    }

    // Create the default context user which will serve as the default context when shopping anonymously
    console.log(`Retrieving anonymous user ${ANONYMOUS_USER_ID}`);
    const userList = await Users.List(publicBuyer.ID, {
      filters: { ID: ANONYMOUS_USER_ID },
    });
    let defaultContextUser = userList.Items[0];
    if (!defaultContextUser) {
      console.log(`Anonymous user doesn't exist, creating new`);
      defaultContextUser = await Users.Create(publicBuyer.ID, {
        ID: ANONYMOUS_USER_ID,
        Username: ANONYMOUS_USER_ID,
        Active: true,
        FirstName: 'Anon',
        LastName: 'User',
        Email: 'test@test.com',
      });
    }

    // We're not storing a base url so instead are modifying AUTH0_BASE_URL for this purpose
    // Its a bit of a hack but we don't expect AUTH0_BASE_URL to change so it should be OK
    const appBaseUrl = process.env.AUTH0_BASE_URL.replace('/shop', '');

    const integrationEventCustomImplementationUrlHost =
      appBaseUrl === 'https://www.edge.localhost'
        ? 'https://edge-shop-website.sitecoredemo.com'
        : appBaseUrl;

    // Update checkout integration event
    console.log('Updating checkout integration event');
    const checkoutIntegrationEvent = await IntegrationEvents.Patch('HeadStartCheckout', {
      CustomImplementationUrl: `${integrationEventCustomImplementationUrlHost}/api/checkout`,
    });

    // Create the single sign on integration events
    console.log('Retrieving integration events');
    const integrationEventList = await IntegrationEvents.List();
    const integrationEventIds = integrationEventList.Items.map(
      (integrationEvent) => integrationEvent.ID
    );
    console.log(`Found integration event IDs: ${integrationEventIds.join(',')}`);
    const integrationEventBody: IntegrationEvent = {
      ElevatedRoles: ['BuyerUserAdmin'],
      ID: 'SingleSignOn',
      EventType: 'OpenIDConnect',
      CustomImplementationUrl: `${integrationEventCustomImplementationUrlHost}/api/openid-connect`,
      Name: 'SingleSignOn',
      HashKey: checkoutIntegrationEvent.HashKey,
    };
    if (!integrationEventIds.includes('SingleSignOn')) {
      // Create integration events for single sign on
      console.log('SingleSignOn integration event does not exist, creating new');
      await IntegrationEvents.Create(integrationEventBody);
    } else {
      console.log('SingleSignOn integration event already exists, updating');
      await IntegrationEvents.Patch('SingleSignOn', integrationEventBody);
    }

    // Create the OpenID Connects
    console.log('Retrieving openID connects');
    const openIdConnectList = await OpenIdConnects.List();
    const openIdConnectListIds = openIdConnectList.Items.map(
      (integrationEvent) => integrationEvent.ID
    );
    console.log(`Found openIDConnect IDs: ${openIdConnectListIds.join(',')}`);
    const openIdConnect: OpenIdConnect = {
      ID: PRODUCTION_OPENID_CONNECT_ID,
      OrderCloudApiClientID: buyerClient.ID,
      ConnectClientID: process.env.AUTH0_CLIENT_ID,
      ConnectClientSecret: process.env.AUTH0_CLIENT_SECRET,
      AppStartUrl: `${appBaseUrl}{2}?oidcToken={0}&idpToken={1}`,
      AuthorizationEndpoint: `${process.env.AUTH0_ISSUER_BASE_URL}/authorize`,
      TokenEndpoint: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      UrlEncoded: true,
      IntegrationEventID: 'SingleSignOn',
      CallSyncUserIntegrationEvent: true,
      IntegrationEventName: 'SingleSignOn',
      AdditionalIdpScopes: null,
    };

    // Create OpenID connect for auth0
    if (!openIdConnectListIds.includes(PRODUCTION_OPENID_CONNECT_ID)) {
      console.log(`OpenIDConnect ${PRODUCTION_OPENID_CONNECT_ID} does not exist, creating new`);
      await OpenIdConnects.Create(openIdConnect);
    } else {
      console.log(`OpenIDConnect ${PRODUCTION_OPENID_CONNECT_ID} already exists, updating`);
      await OpenIdConnects.Patch(PRODUCTION_OPENID_CONNECT_ID, openIdConnect);
    }

    // Create OpenID connect for auth0 (local development)
    openIdConnect.ID = DEVELOPMENT_OPENID_CONNECT_ID;
    openIdConnect.AppStartUrl = 'https://www.edge.localhost{2}?oidcToken={0}&idpToken={1}';
    if (!openIdConnectListIds.includes(DEVELOPMENT_OPENID_CONNECT_ID)) {
      console.log(`OpenIDConnect ${DEVELOPMENT_OPENID_CONNECT_ID} does not exist, creating new`);
      await OpenIdConnects.Create(openIdConnect);
    } else {
      console.log(`OpenIDConnect ${DEVELOPMENT_OPENID_CONNECT_ID} already exists, updating`);
      await OpenIdConnects.Patch(DEVELOPMENT_OPENID_CONNECT_ID, openIdConnect);
    }

    await createBuyerLocationResources(
      'profiled',
      profiledBuyer.ID,
      PROFILED_HEADSTART_CATALOG_ID,
      PROFILED_HEADSTART_CATALOG_NAME,
      PROFILED_LOCATION_ID_SUFFIX,
      PROFILED_LOCATION_NAME
    );

    await createBuyerLocationResources(
      'public',
      publicBuyer.ID,
      PUBLIC_HEADSTART_CATALOG_ID,
      PUBLIC_HEADSTART_CATALOG_NAME,
      PUBLIC_LOCATION_ID_SUFFIX,
      PUBLIC_LOCATION_NAME
    );

    console.log('Assign user to location group');
    await UserGroups.SaveUserAssignment(publicBuyer.ID, {
      UserGroupID: `${publicBuyer.ID}-${PUBLIC_LOCATION_ID_SUFFIX}`,
      UserID: ANONYMOUS_USER_ID,
    });
    console.log('Assign user to headstart catalog');
    await UserGroups.SaveUserAssignment(publicBuyer.ID, {
      UserGroupID: PUBLIC_HEADSTART_CATALOG_ID,
      UserID: ANONYMOUS_USER_ID,
    });

    // Update the buyer client to make it accessible for anonymous shopping
    await ApiClients.Patch(buyerClient.ID, {
      IsAnonBuyer: true,
      DefaultContextUserName: defaultContextUser.Username,
    });

    return response.status(200).json('Initialized successfully');
    /* eslint-disable-next-line */
  } catch (error: any) {
    if (error.isOrderCloudError) {
      // the request was made and the API responded with a status code
      // that falls outside of the range of 2xx, the error will be of type OrderCloudError
      // https://ordercloud-api.github.io/ordercloud-javascript-sdk/classes/orderclouderror
      const message = error.message;
      const errors = JSON.stringify(error.errors, null, 4);
      const requestUrl = `${error.request.method} ${process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL}${error.request.path}`;
      console.log('-------ERROR-------');
      console.log(requestUrl);
      console.log(message);
      console.log(errors);
      console.log('-----END ERROR-----');
      return response.status(500).json({
        RequestUrl: requestUrl,
        Message: message,
        Errors: errors,
      });
    } else if (error.request) {
      // the request was made but no response received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      console.log(error.request);
      return response.status(500).json({
        Message: `An unknown error occurred (no response) while making a request to ${error.request.url}`,
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      return response.status(500).json({
        Message: `An error occurred wile setting up an http request that triggered an error. ${error.message}`,
      });
    }
  }
};

async function createBuyerLocationResources(
  type: 'profiled' | 'public',
  buyerID: string,
  catalogID: string,
  catalogName: string,
  locationIDSuffix: string,
  locationName: string
) {
  // Create a headstart "catalog" this is actually just a usergroup with xp.Type = 'Catalog'
  // not strictly required but we want to be compatible with headstart admin
  const headstartCatalogs = await UserGroups.List(buyerID, {
    filters: { ID: catalogID },
  });
  if (!headstartCatalogs.Items.length) {
    console.log(`Creating headstart catalog for ${type}`);
    await UserGroups.Create(buyerID, {
      ID: catalogID,
      Name: catalogName,
      xp: {
        Type: 'Catalog',
      },
    });
  } else {
    console.log(`Skipped creating headstart catalog for ${type}, already exists`);
  }

  // Create a buyer location group
  const locationID = `${buyerID}-${locationIDSuffix}`;
  const buyerLocationGroups = await UserGroups.List(buyerID, {
    filters: { ID: locationID },
  });
  if (!buyerLocationGroups.Items.length) {
    console.log(`Creating location group for ${type}`);
    await UserGroups.Create(buyerID, {
      ID: locationID,
      Name: locationName,
      xp: {
        Type: 'BuyerLocation',
        Currency: 'USD',
        Country: 'US',
        CatalogAssignments: [catalogID],
      },
    });
  } else {
    console.log(`Skipped creating location group for ${type}, already exists`);
  }

  // Create a buyer location adddress
  const buyerLocationAddresses = await Addresses.List(buyerID, {
    filters: { ID: locationID },
  });
  if (!buyerLocationAddresses.Items.length) {
    console.log(`Creating location address for ${type}`);
    await Addresses.Create(buyerID, {
      ID: locationID,
      AddressName: 'PLAY! SHOP',
      Street1: '101 California St',
      Street2: 'St #1600',
      City: 'San Francisco',
      State: 'CA',
      Zip: '94111',
      Country: 'US',
    });
  } else {
    console.log(`Skipped creating location address for ${type}, already exists`);
  }

  await createLocationPermissions(buyerID, locationID);

  // Create buyer location approval rule
  const buyerLocationApprovalRules = await ApprovalRules.List(buyerID, {
    filters: { ID: locationID },
  });
  if (!buyerLocationApprovalRules.Items.length) {
    console.log(`Creating location approval rule for ${type}`);
    await ApprovalRules.Create(buyerID, {
      ID: locationID,
      ApprovingGroupID: `${locationID}-OrderApprover`,
      Description:
        'General Approval Rule for Location. Every Order Over a Certain Limit will Require Approval for the designated group of users.',
      Name: `PLAY! SHOP General Location Approval Rule`,
      RuleExpression: `order.xp.ApprovalNeeded = '${locationID}' & order.Total > 0`,
    });
  } else {
    console.log(`Skipped creating location approval rule for ${type}, already exists`);
  }

  // Assign buyer location adddress and group for the profiled buyer
  console.log(`Assign location address ${locationID} to location group ${locationID}`);
  await Addresses.SaveAssignment(buyerID, {
    AddressID: locationID,
    UserGroupID: locationID,
    IsBilling: true,
    IsShipping: true,
  });
}

async function createLocationPermissions(buyerID: string, locationID: string) {
  const permissions = [
    {
      Name: 'Location Permission Admin',
      Role: 'PermissionAdmin',
      SecurityProfileID: 'HSLocationPermissionAdmin',
    },
    {
      Name: 'Location Order Approver',
      Role: 'OrderApprover',
      SecurityProfileID: 'HSLocationOrderApprover',
    },
    {
      Name: 'Location Needs Approval',
      Role: 'NeedsApproval',
      SecurityProfileID: 'HSLocationNeedsApproval',
    },
    {
      Name: 'View All Location Orders',
      Role: 'ViewAllOrders',
      SecurityProfileID: 'HSLocationViewAllOrders',
    },
    {
      Name: 'Credit Card Admin',
      Role: 'CreditCardAdmin',
      SecurityProfileID: 'HSLocationCreditCardAdmin',
    },
    {
      Name: 'Address Admin',
      Role: 'AddressAdmin',
      SecurityProfileID: 'HSLocationAddressAdmin',
    },
  ];
  console.log('Creating location permissions');
  const requests = permissions.map(async (permission) => {
    const permissionGroupID = `${locationID}-${permission.Role}`;
    const permissionGroups = await UserGroups.List(buyerID, {
      filters: { ID: permissionGroupID },
    });
    if (!permissionGroups.Items.length) {
      console.log(`Creating location permission group ${permissionGroupID}`);
      await UserGroups.Create(buyerID, {
        ID: permissionGroupID,
        Name: permission.Name,
        xp: {
          Role: permission.Role,
          Type: 'LocationPermissions',
          Location: locationID,
        },
      });
    } else {
      console.log(`Skipped location permission group for ${permissionGroupID}, already exists`);
    }

    console.log(
      `Assigning location permission group ${permissionGroupID} to security profile ${permission.SecurityProfileID}`
    );
    await SecurityProfiles.SaveAssignment({
      UserGroupID: permissionGroupID,
      BuyerID: buyerID,
      SecurityProfileID: permission.SecurityProfileID,
    });
  });
  await Promise.all(requests);
}

export default handler;
