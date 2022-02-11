# Sitecore CDP and Personalize

The website project is optionally using Sitecore CDP and Personalize for multiple web and full stack experiences.

The demo is built to be functionnal even if Sitecore CDP and Personalize are not enabled.

If you want to use this integration, you must:

1. Have a Sitecore CDP and Personalize organisation
2. [Enable Sitecore CDP and Personlize in the demo](#enable-sitecore-cdp-and-personalize)
3. [Implement the general Sitecore Personalize assets in your organisation](stories/general.md)
4. Implement the desired Sitecore Personalize stories in your organisation:
   1. [Ticket Checkout - VIP Upsell](stories/ticket-checkout-vip-upsell.md)
   2. [Premium Session Page - VIP Ticket Upgrade](stories/premium-session-page-vip-ticket-upgrade.md)
   3. [Session Browse Abandonment](stories/session-browse-abandonment.md)
   4. [Subscribe to update emails campaign](stories/subscribe-to-update-emails-campaign.md)
   5. [Dynamic Welcome Message](stories/dynamic-welcome-message.md)

There are also a few stories that cannot be replicated in your Sitecore Personalize organisation due to various limitations:

1. [Website - Audience-based website home page hero](stories/website-audience-based-website-home-page-hero.md)
2. [Website - Message Bar Below Header](stories/website-message-bar-below-header.md)

## Enable Sitecore CDP and Personalize

### Website

1. Open the root `.env` file.
2. For `CDP_API_TARGET_ENDPOINT`, take the URL of your CDP/Personalize home page and replace `app` by `api`. e.g.:
   - For `https://app.boxever.com`, the API target endpoint is `https://api.boxever.com`
   - For `https://app-us.boxever.com`, the API target endpoint is `https://api-us.boxever.com`
3. To get the client key and API token for `CDP_CLIENT_KEY` and `CDP_API_TOKEN`, follow the procedure on [https://doc.sitecore.com/cdp/en/users/sitecore-personalize/manage-api-access-in-sitecore-personalize.html](https://doc.sitecore.com/cdp/en/users/sitecore-personalize/manage-api-access-in-sitecore-personalize.html)

Example configuration:

```ini
# CDP
CDP_PROXY_HOST=cdp.edge.localhost
CDP_API_TARGET_ENDPOINT=https://api.boxever.com
CDP_CLIENT_KEY=6dabaf8bae914e3881cf1f725a70acea
CDP_API_TOKEN=0f081fffc159400c93188df1f5faa52d
```

### Kiosk

1. Open the `kiosk\.env` file.
2. For `NEXT_PUBLIC_CDP_API_TARGET_ENDPOINT`, take the URL of your CDP/Personalize home page, replace `app` by `api`, and add `/v1.2` at the end. e.g.:
   - For `https://app.boxever.com`, the API target endpoint is `https://api.boxever.com/v1.2`
   - For `https://app-us.boxever.com`, the API target endpoint is `https://api-us.boxever.com/v1.2`
3. To get the client key for `NEXT_PUBLIC_CDP_CLIENT_KEY`, follow the procedure on [https://doc.sitecore.com/cdp/en/users/sitecore-personalize/manage-api-access-in-sitecore-personalize.html](https://doc.sitecore.com/cdp/en/users/sitecore-personalize/manage-api-access-in-sitecore-personalize.html)

Example configuration:

```ini
# CDP
NEXT_PUBLIC_CDP_PROXY_URL=https://cdp.edge.localhost
NEXT_PUBLIC_CDP_API_TARGET_ENDPOINT=https://api.boxever.com/v1.2
NEXT_PUBLIC_CDP_CLIENT_KEY=6dabaf8bae914e3881cf1f725a70acea
```