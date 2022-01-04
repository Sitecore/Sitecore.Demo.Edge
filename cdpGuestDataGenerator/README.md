# Sitecore CDP Guest Data Generator

This project is used to generate realistic fake data in a Sitecore CDP guest profile through scenarios.

This project is a fork of boxever-api-chainsaw. The chainsaw library has been updated to run smoothly on Windows with minimal dependencies.

## Prerequisites

1. `npm install`
2. Fill the environment variables in the `.env` file with your Sitecore CDP organisation details and desired guest.
   - `API_TARGET_ENDPOINT` format is just the domain name. Example: `api.boxever.com`

## Scenarios

Scenarios are stored in the `\scenarios` folder. Each scenario has an associated npm script:

- `kioskToWeb.js`
  - `npm run generate`
  - User journey from the kiosk where they buy a regular ticket, to opening the email, clicking on the link, browsing the website, visiting a premium session, being presented with the VIP ticket upsell web experience, clicking on it, and upgrading their ticket to a VIP ticket.
  - This scenario uses the `GUEST_*` environment variables to chose the guest to generate the data for. It can be a new or existing guest.
