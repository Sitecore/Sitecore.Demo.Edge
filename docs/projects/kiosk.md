# Kiosk

## Project Description

Provides tablet-format kiosk web applications for the PLAY! Summit expo such as:

- Ticket buying and newsletter subscription kiosk.

It is built using:

- Sitecore CDP
- Next.js
- Vercel

## Prerequisites

Ensure you have installed and followed the [global prerequisites](../prerequisites.md).

In an elevated PowerShell terminal:

1. Navigate to the kiosk folder: `cd .\kiosk`
2. Install NodeJs packages from NPM: `npm install`

### Optional: Sitecore CDP Module Configuration

If you want the kiosk application to save contact information in Sitecore CDP, you must:

1. Ensure you have run the [Docker prerequisites](../docker.md#Prerequisites).
2. [Configure the CDP proxy environment variables](../cdp-personalize/README.md#cdp-proxy-and-website).
3. [Configure the kiosk environment variables](../cdp-personalize/README.md#kiosk).

## Running the Kiosk

Ensure you have run the [prerequisites](#Prerequisites) above.

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
