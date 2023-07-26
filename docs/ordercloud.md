# Sitecore OrderCloud

## Configuring

### Headstart Seeding

Please follow the instruction on ["Seeding OrderCloud Data" on headstart](https://github.com/ordercloud-api/headstart#seeding-ordercloud-data) with one modification. For your [seed request](https://github.com/ordercloud-api/headstart/blob/951c3927b276f2bf23524cc3c375147f172403b7/src/Middleware/src/Headstart.Common/Assets/SeedTemplate.json) add the property "Buyers" and substitute the values with those found in the [seeding constants](../Website/src/rendering/src/constants/seeding.ts).

```json
{
  "Buyers": [
    {
      "ID": "{PROFILED_BUYER_ID}",
      "Name": "{PROFILED_BUYER_NAME}",
      "Active": true
    },
    {
      "ID": "{PUBLIC_BUYER_ID}",
      "Name": "{PUBLIC_BUYER_NAME}",
      "Active": true
    }
  ]
}
```

This will initialize the marketplace and seed data with some of the fundamental entities required by headstart. Then, the endpoints here will seed data that is specific to the PLAY! SHOP demo.

You will need the following information after seeding:

- MiddlewareClientID
- MiddlewareClientSecret

### PLAY! SHOP Seeding

After completing all of the above steps, we are ready to call the endpoints below. These routes are used to initialize data required by PLAY! SHOP, as well as sync categories and products between Sitecore Discover and Sitecore OrderCloud. The inputs to products and categories are the CSV files located in /Website/src/rendering/discover-feeds.

1. Visit `https://www.edge.localhost/api/ordercloud/init?MiddlewareClientID=<YOUR_MIDDLEWARE_CLIENT_ID>&MiddlewareClientSecret=<YOUR_MIDDLEWARE_CLIENT_SECRET>` in the browser to initialize the public buyer, and single sign on configuration.
2. Visit `https://www.edge.localhost/api/ordercloud/synccategories?MiddlewareClientID=<YOUR_MIDDLEWARE_CLIENT_ID>&MiddlewareClientSecret=<YOUR_MIDDLEWARE_CLIENT_SECRET>` in the browser to sync the categories.
3. Visit `https://www.edge.localhost/api/ordercloud/syncproducts?MiddlewareClientID=<YOUR_MIDDLEWARE_CLIENT_ID>&MiddlewareClientSecret=<YOUR_MIDDLEWARE_CLIENT_SECRET>` in the browser to sync the products.

Now we are ready to explore our marketplace on [https://portal.ordercloud.io/marketplaces](https://portal.ordercloud.io/marketplaces) and use the demo.

## Running the application locally

### Configuring Checkout Integration Events

During checkout we make use of OrderCloud's [checkout integration events](https://ordercloud.io/knowledge-base/order-checkout-integration) to retrieve shipping estimates as well as to calculate tax. These integration events require the relevant endpoints to be publicly accessible. For ease of use we have configured the application to reference an always-on, publicly available server to handle these requests (https://edge-shop-website.sitecoredemo.com). However, such a scenario may arise where you are updating the logic in the endpoints and need those endpoints to be called to validate your logic while developing locally.

To enable this functionality, you will need to follow these steps:

1. Install [ngrok](https://ngrok.com/)
2. Run the command `ngrok http 8099`.
   1. This will give your locally running nexjts application [which will be exposed on port 8099](../docker-compose.override.yml#L43) a publicly accessible url.
3. Create a **new** [Integration Event](https://ordercloud.io/api-reference/seller/integration-events/create). It should be the same as the hosted one except for `CustomImplementationUrl` which should now use the ngrok url from the previous step and will be in the format: `{ngrokUrl}/api/checkout`
4. Create a **new** [API client](https://ordercloud.io/api-reference/seller/api-clients/create), it should be the same as your public buyer except for `OrderCheckoutIntegrationEventID` which should now be set the ID of the integration event created in the previous step.
5. Update `ORDERCLOUD_BUYER_CLIENT_ID` to the ID of the API client from the previous step.
6. Start your project as usual
7. Clear the cookies in your browser session. You want to make sure you get a new token from the API client we just configured.
8. You can now go through the checkout process and when calculating taxes or retrieving shipping estimates your local endpoints will be hit instead of the hosted ones.

### Configuring Single Sign On

The OpenID Connect integration event is responsible for enabling single sign on via auth0. Enabling this allows your users to log in via single sign on (Auth0) as well as access logged-in user flows. To do that you must have [configured commerce](../docs/projects/website.md#optional-commerce-configuration) and [custom Auth0](../docs/projects/website.md#optional-custom-auth0-configuration)

Unlike the checkout integration events, we can't have a general use publicly available endpoint that handles this logic for you because it needs to be configured for your own auth0 tenant.

After you've hosted your own application then you can simply set IntegrationEvent.CustomImplementationUrl to {your_application_url}/api/openid-connect to use that hosted version even for local development.

If you haven't yet hosted your application and want to enable single sign on while developing locally then you'll need to take a similar strategy as we did for configuring checkout integration events and use ngrok. Ensure that your OrderCloud marketplace is not used by other people that yourself.

1. Install [ngrok](https://ngrok.com/)
2. Run the command `ngrok http 8099`
   1. This will give your locally running nexjts application [which will be exposed on port 8099](../docker-compose.override.yml#L43) a publicly accessible url.
3. Patch the `SingleSignOn` OrderCloud [Integration Event](https://ordercloud.io/api-reference/seller/integration-events/create) `CustomImplementationUrl`.

    ```json
    {
        "ID": "SingleSignOn",
        "CustomImplementationUrl": "https://your-ngrok-url/api/openid-connect",
    }
    ```

4. Make sure all of the environment variables defined in [custom Auth0 configuration](../docs/projects/website.md#optional-custom-auth0-configuration) are filled out.

### Running Headstart Seller UI and Middleware locally

1. Switch to Linux containers

2. Set OC_HEADSTART_ENABLED environment variable to **1**

3. Set the following environment variables to the values received from the /seed endpoint (see [Headstart Seeding](#headstart-seeding)):

   - ORDERCLOUD_BUYER_CLIENT_ID
   - ORDERCLOUD_SELLER_CLIENT_ID
   - ORDERCLOUD_MIDDLEWARE_CLIENT_ID
   - ORDERCLOUD_MIDDLEWARE_CLIENT_SECRET
   - ORDERCLOUD_MIDDLEWARE_ALLOWED_CLIENTIDS (should be equal to ORDERCLOUD_SELLER_CLIENT_ID)

4. Run `docker compose -f .\docker-compose.linux.yml up -d`.

Headstart services will be available at the following URLs:

- [http://localhost:43010](http://localhost:43010) (Seller UI, username & password are set during the seeinng process)
- [http://localhost:43005](http://localhost:43005) (Middleware API)

### Stopping the Headstart Seller UI and Middleware containers

1. Switch to Linux containers

2. Run `docker compose -f .\docker-compose.linux.yml down`.
