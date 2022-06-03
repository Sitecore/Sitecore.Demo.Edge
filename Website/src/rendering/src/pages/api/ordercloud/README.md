# OrderCloud API Routes

Currently there are two OrderCloud API routes:

- /api/ordercloud/synccategories
- /api/ordercloud/syncproducts

These routes are used to sync categories and products between Sitecore Discover and Sitecore OrderCloud. Their inputs are the CSV files located in /Website/src/rendering/discover-feeds.

## Initial setup

The first step would be to create an account on <https://portal.ordercloud.io/register>.

From that point on, a script is needed in order to create a marketplace, a buyer, a catalog etc.

### Creating a marketplace

If you do not have an existing marketplace ID, you can create one using this code snippet:

```javascript
const marketplace = {
  Id: "<YOUR_DESIRED_MARKETPLACE_ID>",
  Name: "<YOUR_DESIRED_MARKETPLACE_NAME>",
  Environment: "Sandbox",
  Region: {
    AzureRegion: "westus",
    Id: "usw",
    Name: "Us-West",
  }
};
await PortalSdk.Save(id, marketplace);
```

Note, that, the **marketplace id** must be unique across your account.

### Creating a buyer

Now we are ready to create a buyer

```javascript
await OrderCloudSDK.Buyers.Create({
  Name: 'Default Buyer',
  Active: true,
});
```

Note, that, a default catalog for this buyer will automatically be created because we did not specify an ID for the buyer object.

## Syncing Discover categories and products to OrderCloud

After completing all of the above steps, we are ready to call the endpoints and enjoy our new categories and products on OrderCloud.

Visit `https://www.edge.localhost/api/ordercloud/synccategories?username=<YOUR_ORDERCLOUD_PORTAL_USERNAME>&password=<YOUR_ORDERCLOUD_PORTAL_PASSWORD>&marketplaceID=<YOUR_ORDERCLOUD_MARKETPLACE_ID>` in the browser to sync the categories.

Then, visit `https://www.edge.localhost/api/ordercloud/syncproducts?username=<YOUR_ORDERCLOUD_PORTAL_USERNAME>&password=<YOUR_ORDERCLOUD_PORTAL_PASSWORD>&marketplaceID=<YOUR_ORDERCLOUD_MARKETPLACE_ID>` in the browser to sync the products.

Now we are ready to explore our marketplace on [https://portal.ordercloud.io/marketplaces](https://portal.ordercloud.io/marketplaces).
