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
  PUBLIC_BUYER_NAME,
  PUBLIC_LOCATION_ID_SUFFIX,
  PROFILED_LOCATION_ID_SUFFIX,
  PROFILED_HEADSTART_CATALOG_ID,
  PUBLIC_HEADSTART_CATALOG_ID,
  PROFILED_BUYER_NAME,
  PROFILED_HEADSTART_CATALOG_NAME,
  PROFILED_LOCATION_NAME,
  PUBLIC_HEADSTART_CATALOG_NAME,
  PUBLIC_LOCATION_NAME,
} from '../../../constants/seeding';

const handler: NextApiHandler<unknown> = async (request, response) => {
  const middlewareClientID = request.query?.MiddlewareClientID as string;
  const middlewareClientSecret = request.query?.MiddlewareClientSecret as string;
  const hostedBuyerSiteUrl = request.query?.HostedBuyerSiteUrl as string;

  if (!middlewareClientID) {
    return response.status(400).json({ Error: 'Missing required parameter MiddlewareClientID' });
  }
  if (!middlewareClientSecret) {
    return response
      .status(400)
      .json({ Error: 'Missing required parameter MiddlewareClientSecret' });
  }
  if (!hostedBuyerSiteUrl) {
    return response.status(400).json({ Error: 'Missing required parameter HostedBuyerSiteUrl' });
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
    const profiledBuyers = await Buyers.List({
      filters: { Name: PROFILED_BUYER_NAME },
    });
    const profiledBuyer = profiledBuyers.Items[0];
    if (!profiledBuyer) {
      return response.status(400).json({
        Error: `The buyer "${PROFILED_BUYER_NAME}" does not exist. This buyer must be created in the headstart seeding process prior to calling this endpoint. Please review the documentation in this project.`,
      });
    }

    // Ensure public buyer exists
    const publicBuyers = await Buyers.List({
      filters: { Name: PUBLIC_BUYER_NAME },
    });
    const publicBuyer = publicBuyers.Items[0];
    if (!publicBuyer) {
      return response.status(400).json({
        Error: `The buyer "${PUBLIC_BUYER_NAME}" does not exist. This buyer must be created in the headstart seeding process prior to calling this endpoint. Please review the documentation in this project.`,
      });
    }

    // Ensure buyer client exists
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
    const userList = await Users.List(publicBuyer.ID, {
      filters: { ID: ANONYMOUS_USER_ID },
    });
    let defaultContextUser = userList.Items[0];
    if (!defaultContextUser) {
      defaultContextUser = await Users.Create(publicBuyer.ID, {
        ID: ANONYMOUS_USER_ID,
        Username: ANONYMOUS_USER_ID,
        Active: true,
        FirstName: 'Anon',
        LastName: 'User',
        Email: 'test@test.com',
      });
    }

    // Update the buyer client to make it accessible for anonymous shopping
    await ApiClients.Patch(buyerClient.ID, {
      IsAnonBuyer: true,
      DefaultContextUserName: defaultContextUser.Username,
    });

    // Update checkout integration event
    const checkoutIntegrationEvent = await IntegrationEvents.Patch('HeadStartCheckout', {
      CustomImplementationUrl: 'https://edge-shop-website.sitecoredemo.com/api/checkout',
    });

    // Create the single sign on integration events
    const integrationEventList = await IntegrationEvents.List();
    const integrationEventIds = integrationEventList.Items.map(
      (integrationEvent) => integrationEvent.ID
    );
    const integrationEventBody: IntegrationEvent = {
      ElevatedRoles: ['BuyerUserAdmin'],
      ID: 'SingleSignOn',
      EventType: 'OpenIDConnect',
      CustomImplementationUrl: 'https://edge-shop-website.sitecoredemo.com/api/openid-connect',
      Name: 'SingleSignOn',
      HashKey: checkoutIntegrationEvent.HashKey,
    };
    if (!integrationEventIds.includes('SingleSignOn')) {
      // Create integration events for single sign on
      await IntegrationEvents.Create(integrationEventBody);
    } else {
      await IntegrationEvents.Patch('SingleSignOn', integrationEventBody);
    }

    // Create the OpenID Connects
    const openIdConnectList = await OpenIdConnects.List();
    const openIdConnectListIds = openIdConnectList.Items.map(
      (integrationEvent) => integrationEvent.ID
    );
    const openIdConnect: OpenIdConnect = {
      ID: 'Auth0Connection',
      OrderCloudApiClientID: buyerClient.ID,
      ConnectClientID: process.env.AUTH0_CLIENT_ID,
      ConnectClientSecret: process.env.AUTH0_CLIENT_SECRET,
      AppStartUrl: `${hostedBuyerSiteUrl}{2}?oidcToken={0}&idpToken={1}`,
      AuthorizationEndpoint: `${process.env.AUTH0_ISSUER_BASE_URL}/authorize`,
      TokenEndpoint: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      UrlEncoded: true,
      IntegrationEventID: 'SingleSignOn',
      CallSyncUserIntegrationEvent: true,
      IntegrationEventName: 'SingleSignOn',
      AdditionalIdpScopes: null,
    };

    // Create OpenID connect for auth0
    if (!openIdConnectListIds.includes('Auth0Connection')) {
      await OpenIdConnects.Create(openIdConnect);
    } else {
      await OpenIdConnects.Patch('Auth0Connection', openIdConnect);
    }

    // Create OpenID connect for auth0 (local development)
    openIdConnect.ID = 'Auth0ConnectionLocal';
    openIdConnect.AppStartUrl = 'https://www.edge.localhost{2}?oidcToken={0}&idpToken={1}';
    if (!openIdConnectListIds.includes('Auth0ConnectionLocal')) {
      await OpenIdConnects.Create(openIdConnect);
    } else {
      await OpenIdConnects.Patch('Auth0ConnectionLocal', openIdConnect);
    }

    await createBuyerLocationResources(
      profiledBuyer.ID,
      PROFILED_HEADSTART_CATALOG_ID,
      PROFILED_HEADSTART_CATALOG_NAME,
      PROFILED_LOCATION_ID_SUFFIX,
      PROFILED_LOCATION_NAME
    );

    await createBuyerLocationResources(
      publicBuyer.ID,
      PUBLIC_HEADSTART_CATALOG_ID,
      PUBLIC_HEADSTART_CATALOG_NAME,
      PUBLIC_LOCATION_ID_SUFFIX,
      PUBLIC_LOCATION_NAME
    );

    await UserGroups.SaveUserAssignment(publicBuyer.ID, {
      UserGroupID: `${publicBuyer.ID}-${PUBLIC_LOCATION_ID_SUFFIX}`,
      UserID: ANONYMOUS_USER_ID,
    });

    return response.status(200).json('Initialized successfully');
    /* eslint-disable-next-line */
  } catch (error: any) {
    if (error.isOrderCloudError) {
      // the request was made and the API responded with a status code
      // that falls outside of the range of 2xx, the error will be of type OrderCloudError
      // https://ordercloud-api.github.io/ordercloud-javascript-sdk/classes/orderclouderror
      console.log(error.message);
      console.log(JSON.stringify(error.errors, null, 4));
    } else if (error.request) {
      // the request was made but no response received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    return response.status(500).json(error);
  }
};

async function createBuyerLocationResources(
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
    await UserGroups.Create(buyerID, {
      ID: catalogID,
      Name: catalogName,
      xp: {
        Type: 'Catalog',
      },
    });
  }

  // Create a buyer location group
  const locationID = `${buyerID}-${locationIDSuffix}`;
  const buyerLocationGroups = await UserGroups.List(buyerID, {
    filters: { ID: locationID },
  });
  if (!buyerLocationGroups.Items.length) {
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
  }

  // Create a buyer location adddress
  const buyerLocationAddresses = await Addresses.List(buyerID, {
    filters: { ID: locationID },
  });
  if (!buyerLocationAddresses.Items.length) {
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
  }

  await createLocationPermissions(buyerID, locationID);

  // Create buyer location approval rule
  const buyerLocationApprovalRules = await ApprovalRules.List(buyerID, {
    filters: { ID: PROFILED_LOCATION_ID_SUFFIX },
  });
  if (!buyerLocationApprovalRules.Items.length) {
    await ApprovalRules.Create(buyerID, {
      ID: locationID,
      ApprovingGroupID: `${locationID}-OrderApprover`,
      Description:
        'General Approval Rule for Location. Every Order Over a Certain Limit will Require Approval for the designated group of users.',
      Name: `PLAY! SHOP General Location Approval Rule`,
      RuleExpression: `order.xp.ApprovalNeeded = '${locationID}' & order.Total > 0`,
    });
  }

  // Assign buyer location adddress and group for the profiled buyer
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
  const requests = permissions.map(async (permission) => {
    await UserGroups.Create(buyerID, {
      ID: `${locationID}-${permission.Role}`,
      Name: permission.Name,
      xp: {
        Role: permission.Role,
        Type: 'LocationPermissions',
        Location: locationID,
      },
    });

    await SecurityProfiles.SaveAssignment({
      BuyerID: buyerID,
      UserGroupID: locationID,
      SecurityProfileID: permission.SecurityProfileID,
    });
  });
  await Promise.all(requests);
}

export default handler;
