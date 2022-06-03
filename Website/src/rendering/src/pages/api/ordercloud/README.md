# OrderCloud API Routes

Currently there are two OrderCloud API routes:

- /api/ordercloud/synccategories
- /api/ordercloud/syncproducts

These routes are used to sync categories and products between Sitecore Discover and Sitecore OrderCloud.
Their inputs are the CSV files located in /Website/src/rendering/discover-feeds.

## **Initial setup**

The first step would be to create an account on <https://portal.ordercloud.io/register>.

From that point on, a script is needed in order to create a marketplace, a buyer, a catalog etc.

### **Authenticating**

Before being able to create a marketplace, we have to authenticate, using the Portal SDK and the username and password used during the account creation on the OrderCloud Portal.

    import * as PortalSdk from '@ordercloud/portal-javascript-sdk';
    import * as OrderCloudSDK from 'ordercloud-javascript-sdk';

    const request = await PortalSdk.Auth.Login(username, password);
    PortalSdk.Tokens.SetAccessToken(request.access_token);

You can also explore alternative ways of authenticating on <https://github.com/ordercloud-api/OrderCloud-JavaScript-SDK#-authentication> and <https://ordercloud-api.github.io/ordercloud-javascript-sdk/classes/auth>.

### **Creating a marketplace**

Now we are ready to create our marketplace

    const marketplace = {
      Id: id,
      Name: name,
      Environment: "Sandbox",
      Region: {
        AzureRegion: "westus",
        Id: "usw",
        Name: "Us-West",
      }
    };
    await PortalSdk.Save(id, marketplace);

Note, that, the **marketplace id** must be unique across your account.

Then, we have to set the access token in the OrderCloud SDK

    const marketplaceAuth = await PortalSdk.ApiClients.GetToken(id);
    OrderCloudSDK.Tokens.SetAccessToken(marketplaceAuth.access_token);

### **Creating a buyer**

Now we are ready to create a buyer

    await OrderCloudSDK.Buyers.Create({
      Name: 'Default Buyer',
      Active: true,
    });

Note, that, a default catalog for this buyer will automatically be created because we did not specify an ID for the buyer object.

### **Final Steps**

After completing all of the above steps, we are ready to call the endpoints and enjoy our new categories and products on OrderCloud.

Simply visit the <https://www.edge.localhost/api/ordercloud/synccategories> in the browser in order to sync the categories.

Right after, visit the <https://www.edge.localhost/api/ordercloud/syncproducts> in the browser in order to sync the products.

Now we are ready to explore our marketplace on <https://portal.ordercloud.io/marketplaces>.
