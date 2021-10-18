# Kiosk

## Project Description

Provides tablet-format kiosk web applications for the PLAY! Summit expo such as:

- Ticket buying and newsletter subscription kiosk.

It is built using:

- Sitecore CDP
- Next.js
- Vercel

## Prerequisites

In an elevated PowerShell terminal:

1. Navigate to the kiosk folder: `cd .\kiosk`
2. Install NodeJs packages from NPM: `npm install`

### Optional: Sitecore CDP Module Configuration

If you want the kiosk application to save contact information in Sitecore CDP, you must:

1. Ensure you have run the [Docker prerequisites](../docker.md#Prerequisites).
2. Setup the kiosk environment variables:
   1. Edit the `.\kiosk\.env` file.
   2. Fill the following values:
      1. **NEXT_PUBLIC_CDP_API_TARGET_ENDPOINT**: The Sitecore CDP API target endpoint for your organisation. The URL must end with `/v1.2`. (e.g.: `https://api.boxever.com/v1.2`)
      2. **NEXT_PUBLIC_CDP_CLIENT_KEY**: Your Sitecore CDP organisation client key.
   3. Save the file.
3. Setup the Docker environment variables:
   1. Edit the `.\.env` file.
   2. Fill the following values:
      1. **CDP_API_TARGET_ENDPOINT**: The Sitecore CDP API target endpoint for your organisation. The URL must end with `.com` without the version. (e.g.: `https://api.boxever.com`)
      2. **CDP_CLIENT_KEY**: Your Sitecore CDP organisation client key.
      3. **CDP_API_TOKEN**: Your Sitecore CDP organisation API token.
   3. Save the file.

## Running the Kiosk

In an elevated PowerShell terminal:

1. If you configured the Sitecore CDP module, the CDP proxy container must be running. [Start the containers](../docker.md#Starting-the-Containers) and follow the login directions.
2. Navigate to the kiosk folder: `cd .\kiosk`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Stopping the Kiosk

Hit `CTRL + C` in your PowerShell terminal.

## Starting Over

Changes to the front-end project must be reverted from your Git client.

## Developing the Kiosk

All changes to the sources trigger a recompile and can be seen live in the browser at [http://localhost:3000](http://localhost:3000).
