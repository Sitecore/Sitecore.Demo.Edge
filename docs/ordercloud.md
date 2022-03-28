# Sitecore OrderCloud

## Configuring 

## Running the application locally

During checkout we make use of OrderCloud's [checkout integration events](https://ordercloud.io/knowledge-base/order-checkout-integration) to retrive shipping estimates as well as to calculate tax. These integration events requires the relevant endpoints to be publicly accessible.

To enable this functionality while developing locally, you will need to follow these steps:

1. Start your project as usual
2. Install [ngrok](https://ngrok.com/) and then run the command `ngrok http 8099`. This will give your locally running nexjts application [which is exposed on port 8099](../docker-compose.override.yml#L43) a publicly accessible url. 
3. Create a **new** [Integration Event](https://ordercloud.io/api-reference/seller/integration-events/create). It should be the same as the hosted one except for `CustomImplementationUrl` which should now use the ngrok url from the previous step and will be in the format: `{ngrokUrl}/api/checkout`
4. Create a **new** [API client](https://ordercloud.io/api-reference/seller/api-clients/create), it should be the same as your public buyer except for `OrderCheckoutIntegrationEventID` which should now be set the ID of the integration event created in the previous step.
5. You can now go through the checkout process and when calculating taxes or retrieving shipping estimates your local endpoints will be hit.