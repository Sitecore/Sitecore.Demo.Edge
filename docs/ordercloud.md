# Sitecore OrderCloud

## Configuring

## Running the application locally

### Configuring Checkout Integration Events

During checkout we make use of OrderCloud's [checkout integration events](https://ordercloud.io/knowledge-base/order-checkout-integration) to retrieve shipping estimates as well as to calculate tax. These integration events require the relevant endpoints to be publicly accessible. For ease of use we have configured the application to reference an always-on, publicly available server to handle these requests (https://edge-shop-website.sitecoredemo.com). However, such a scenario may arise where you are updating the logic in the endpoints and need those endpoints to be called to validate your logic while developing locally.

To enable this functionality, you will need to follow these steps:

1. Install [ngrok](https://ngrok.com/) and then run the command `ngrok http 8099`. This will give your locally running nexjts application [which will be exposed on port 8099](../docker-compose.override.yml#L43) a publicly accessible url.
2. Create a **new** [Integration Event](https://ordercloud.io/api-reference/seller/integration-events/create). It should be the same as the hosted one except for `CustomImplementationUrl` which should now use the ngrok url from the previous step and will be in the format: `{ngrokUrl}/api/checkout`
3. Create a **new** [API client](https://ordercloud.io/api-reference/seller/api-clients/create), it should be the same as your public buyer except for `OrderCheckoutIntegrationEventID` which should now be set the ID of the integration event created in the previous step.
4. Update `ORDERCLOUD_BUYER_CLIENT_ID` to the ID of the API client from the previous step.
5. Start your project as usual
6. Clear the cookies in your browser session. You want to make sure you get a new token from the API client we just configured.
7. You can now go through the checkout process and when calculating taxes or retrieving shipping estimates your local endpoints will be hit instead of the hosted ones.

### Configuring Single Sign On

The OpenID Connect integration event is responsible for enabling single sign on via auth0. Enabling this allows your users to log in via single sign on (Auth0) as well as access logged-in user flows. To do that you must have [configured commerce](../docs/projects/website.md#optional-commerce-configuration) and [profiled user](../docs/projects//website.md#optional-profiled-user-configuration)

Unlike the checkout integration events, we can't have a general use publicly available endpoint that handles this logic for you because it needs to be configured for your own auth0 tenant.

After you've hosted your own application then you can simply set IntegrationEvent.CustomImplementationUrl to {your_application_url}/api/openid-connect to use that hosted version even for local development.

If you haven't yet hosted your application and want to enable single sign on while developing locally then you'll need to take a similar strategy as we did for configuring checkout integration events and use ngrok:

1. Install [ngrok](https://ngrok.com/) and then run the command `ngrok http 8099`. This will give your locally running nexjts application [which will be exposed on port 8099](../docker-compose.override.yml#L43) a publicly accessible url.
2. Update or create an [Integration Event](https://ordercloud.io/api-reference/seller/integration-events/create)

    ```json
    {
        "ElevatedRoles": [
            "BuyerUserAdmin"
        ],
        "ID": "SingleSignOn",
        "ConfigData": null,
        "EventType": "OpenIDConnect",
        "CustomImplementationUrl": "https://your-ngrok-url/api/openid-connect",
        "Name": "SingleSignOn",
        "HashKey": "ORDERCLOUD_WEBHOOK_HASHKEY" // defined in .env file
    }
    ```

3. Update or create an [OpenID Connect Configuration](https://ordercloud.io/api-reference/authentication-and-authorization/open-id-connects/save) for local development.

    ```json
    {
        "ID": "ORDERCLOUD_OPENID_CONNECT_ID", // defined in .env file
        "OrderCloudApiClientID": "ORDERCLOUD_BUYER_CLIENT_ID", // defined in .env file
        "ConnectClientID": "AUTH0_CLIENT_ID", // defined in .env file
        "ConnectClientSecret": "AUTH0_CLIENT_SECRET", // defined in .env file
        "AppStartUrl": "https://www.edge.localhost/shop?oidcToken={0}",
        "AuthorizationEndpoint": "", // In Auth0 under Application > Settings > Advanced Settings > Endpoints > OAuth Authorization URL
        "TokenEndpoint": "", // In Auth0 under Application > Settings > Advanced Settings > Endpoints > OAuth Token URL
        "UrlEncoded": true,
        "IntegrationEventID": "SingleSignOn",
        "CallSyncUserIntegrationEvent": true,
        "AdditionalIdpScopes": null
    }
    ```

4. Set `ORDERCLOUD_OPENID_CONNECT_ID` to the ID in step 3
5. Make sure all of the environment variables defined in [profiled user configuration](../docs/projects/website.md#optional-profiled-user-configuration) are filled out.
