# Sitecore OrderCloud

## Configuring 

## Running the application locally

During checkout we make use of OrderCloud's [checkout integration events](https://ordercloud.io/knowledge-base/order-checkout-integration) to retrieve shipping estimates as well as to calculate tax. These integration events require the relevant endpoints to be publicly accessible. For ease of use we have configured the application to reference an always-on, publicly available server to handle these requests. However, such a scenario may arise where you are updating the logic in the endpoints and need those endpoints to be called to validate your logic while developing locally.

To enable this functionality, you will need to follow these steps:

1. Install [ngrok](https://ngrok.com/) and then run the command `ngrok http 8099`. This will give your locally running nexjts application [which will be exposed on port 8099](../docker-compose.override.yml#L43) a publicly accessible url. 
2. Create a **new** [Integration Event](https://ordercloud.io/api-reference/seller/integration-events/create). It should be the same as the hosted one except for `CustomImplementationUrl` which should now use the ngrok url from the previous step and will be in the format: `{ngrokUrl}/api/checkout`
3. Create a **new** [API client](https://ordercloud.io/api-reference/seller/api-clients/create), it should be the same as your public buyer except for `OrderCheckoutIntegrationEventID` which should now be set the ID of the integration event created in the previous step.
4. Update `ORDERCLOUD_BUYER_CLIENT_ID` to the ID of the API client from the previous step.
5. Start your project as usual
6. Clear the cookies in your browser session. You want to make sure you get a new token from the API client we just configured.
7. You can now go through the checkout process and when calculating taxes or retrieving shipping estimates your local endpoints will be hit instead of the hosted ones.