# TV

## Project Description

Displays timely contextual information on TV screens across the PLAY! Summit expo.

It is built using:

- Sitecore Content Hub Edge
- Next.js
- Vercel

## Prerequisites

Ensure you have installed and followed the [global prerequisites](../prerequisites.md).

In an elevated PowerShell terminal:

1. Navigate to the tv folder: `cd .\tv`
2. Install NodeJs packages from NPM: `npm install`

### Sitecore Content Hub Module Configuration

The TV project uses Sitecore Content Hub Edge.

1. Edit the `.\tv\.env` file.
2. Fill the following values:
   1. **NEXT_PUBLIC_CMP_PREVIEW_ENDPOINT_URL**: `https://YOUR_CONTENT_HUB_SANDBOX_NAME.sitecoresandbox.cloud/api/graphql/preview/v1/`
   2. **NEXT_PUBLIC_CMP_PREVIEW_API_KEY**: Your Content Hub Edge preview API key.
3. Save the file.

## Running the TV

Ensure you have run the [prerequisites](#Prerequisites) above.

In an elevated PowerShell terminal:

1. Navigate to the tv folder: `cd .\tv`
2. Run the development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

The pages auto-updates as you edit the sources.

## Stopping the TV

Hit `CTRL + C` in your PowerShell terminal.

## Starting Over

Changes to the front-end project must be reverted from your Git client.

## Developing the TV

All changes to the sources trigger a recompile and can be seen live in the browser at [http://localhost:3000](http://localhost:3000).
