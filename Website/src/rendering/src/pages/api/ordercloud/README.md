# OrderCloud API Routes

Currently there are three OrderCloud API routes:

- /api/ordercloud/init
- /api/ordercloud/synccategories
- /api/ordercloud/syncproducts

These routes are used to initialize data required by play summit, as well as sync categories and products between Sitecore Discover and Sitecore OrderCloud. The inputs to products and categories are the CSV files located in /Website/src/rendering/discover-feeds.

## Headstart Seeding

Please follow the instruction on ["Seeding OrderCloud Data" on headstart](https://github.com/ordercloud-api/headstart#seeding-ordercloud-data) with one modification:

For your [seed request](https://github.com/ordercloud-api/headstart/blob/951c3927b276f2bf23524cc3c375147f172403b7/src/Middleware/src/Headstart.Common/Assets/SeedTemplate.json) add the property "Buyers" with a value of [PLAY_SUMMIT_PUBLIC_STOREFRONT_NAME](../../../constants/seeding.ts)

```json
[
  {
    "Name": "Play! Summit - Public Storefront"
  },
   {
    "Name": "Play! Summit - Profiled Storefront"
  }
]
```

This will initialize the marketplace and seed data with some of the fundamental entities required by headstart. Then, the endpoints here will seed data that is specific to the Play! Summit demo

You will need the following information after seeding:

- MiddlewareClientID
- MiddlewareClientSecret

We will also need the following:

- HostedBuyerSiteUrl - URL to your hosted buyer site

## Play! Summit Seeding

After completing all of the above steps, we are ready to call the endpoints below to seed our Play! Summit specific data including products and categories.

First visit `https://www.edge.localhost/api/ordercloud/synccategories?MiddlewareClientID=<YOUR_MIDDLEWARE_CLIENT_ID>&MiddlewareClientSecret=<YOUR_MIDDLEWARE_CLIENT_SECRET>&HostedBuyerSiteUrl=<YOUR_HOSTED_BUYER_SITE_URL>` to initialize the public buyer, and single sign on configuration required by play summit.

Then, Visit `https://www.edge.localhost/api/ordercloud/synccategories?MiddlewareClientID=<YOUR_MIDDLEWARE_CLIENT_ID>&MiddlewareClientSecret=<YOUR_MIDDLEWARE_CLIENT_SECRET>` in the browser to sync the categories.

Finally, visit `https://www.edge.localhost/api/ordercloud/syncproducts?MiddlewareClientID=<YOUR_MIDDLEWARE_CLIENT_ID>&MiddlewareClientSecret=<YOUR_MIDDLEWARE_CLIENT_SECRET>` in the browser to sync the products.

Now we are ready to explore our marketplace on [https://portal.ordercloud.io/marketplaces](https://portal.ordercloud.io/marketplaces).
