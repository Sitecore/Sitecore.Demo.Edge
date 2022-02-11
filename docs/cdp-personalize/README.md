# Sitecore CDP and Personalize

The website project is optionally using Sitecore CDP and Personalize for multiple web and full stack experiences.

If you want to use these features, you must:

1. Have a Sitecore CDP and Personalize organisation.
2. [Enable Sitecore CDP and Personlize in the demo](#enable-sitecore-cdp-and-personalize).
3. Implement all the Sitecore Personalize stories in your organisation:
   1. [General Sitecore Personalize assets](stories/general.md)
   2. [Website - Message Bar Below Header](stories/website-essage-bar-below-header.md)

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