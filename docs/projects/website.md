# Website

## Project Description

Main PLAY! Summit website built with:

- Sitecore Experience Management
- Sitecore JavaScript Services (JSS)
- Sitecore Experience Edge
- Sitecore CDP
- Sitecore Personalize
- Next.js
- Vercel

### Project Content

The `\Website` folder has:

- A Visual Studio solution.
- Sitecore CLI configuration.
- A `\deploy` folder that is volume mounted to the CM container. It is used to deploy from Visual Studio to the running container.

The `\src` subfolder has the Sitecore Content Serialization (SCS) configuration and 3 subfolders:

- `\items`: Serialized items using Sitecore Content Serialization (SCS).
- `\platform`: .Net project with Sitecore configuration, pipeline processors, custom fields, and utility pages.
- `\rendering`: Sitecore JSS Next.js project connected to the Docker CM using the XM Edge GraphQL development endpoint.

### Configured for Sitecore-based workflow

It is intended that you work directly in Sitecore to define templates and renderings, instead of using the code-first approach. This is also known as "Sitecore-first" JSS workflow. To support this:

- The JSS content workflow is disabled.
- Imported items will not be marked as 'protected'.
- JSS import warnings in the Content Editor and Experience Editor have been disabled.

### Serialized Sitecore Items

The `\items` folder contains serialized Sitecore content items for this demo. The serialized paths are configured in `*.module.json` files in the parent directory.

- `InitItems.module.json` configures items which this template needs to push before deploying JSS items using `jss deploy` (command that is not used in this demo that is developed using Sitecore-first).
- `EdgeWebsite.module.json` contains developer-owned configuration items which are created by the JSS website.
- `EdgeWebsite-Content.module.json` contains content items which are created by the JSS website. It's a good practice to put content into a separate module, so it can be excluded from packaging and deployment.

See Sitecore Content Serialization documentation for more information.

### Sitecore Platform Project

This Visual Studio / MSBuild project is used to deploy code and configuration to the main Sitecore platform roles, known as Content Management (CM). (This sample uses the XM1 container topology and thus only has a Standalone `cm`.)

### Rendering Next.js Project

The `\rendering` folder contains the main website JSS Next.js project. The content of this folder is mapped to the Rendering container using a Docker volume. All changes to the sources trigger a recompile and can be seen live in the browser at [https://www.edge.localhost](https://www.edge.localhost).

You can also run the Next.js application directly using `npm` commands within `src\rendering`. It is not recommended to run both the rendering Docker container and the npm commands at the same time as both use the same output folder. Stop the rendering Docker container if you want to run the Next.js application using `npm` commands.

#### Storybook

The project uses [Storybook](https://github.com/storybookjs/storybook) for "disconnected" development. Standard JSS "disconnected" mode has been removed. `jss start` runs connected and expects Sitecore to be running using the provided Docker-compose container environment.

To browse the existing stories, run `jss storybook`

To add a new story, create a `*.stories.tsx` file under `src\stories`. Use other files in that folder as an example.

If adding a component story, the title should be: `'Components/%Component Name Here%'`. For pages, it is `'Pages/%Page Name Here%'`.

`jss scaffold [%OptionalComponentPath%]%ComponentName%` will automatically create the related component story.

## Prerequisites

1. Ensure you have installed and followed the [global prerequisites](../prerequisites.md).
2. Ensure you have run the [Docker prerequisites](../docker.md#Prerequisites).

### Optional: Sitecore CDP Module Configuration

If you want the website to use Sitecore CDP, you must:

1. Edit the `.\.env` file.
2. Fill the following values:
   1. **CDP_API_TARGET_ENDPOINT**: The Sitecore CDP API target endpoint for your organisation. The URL must end with `.com` without the version. (e.g.: `https://api.boxever.com`)
   2. **CDP_CLIENT_KEY**: Your Sitecore CDP organisation client key.
   3. **CDP_API_TOKEN**: Your Sitecore CDP organisation API token.
3. Save the file.

### Optional: Sitecore Content Hub Module Configuration

If you want the website to use Sitecore Content Hub DAM and CMP, you must:

1. Edit the `.\.env` file.
2. Fill the following values:
   1. **CMP_ContentHub**: `ClientId=LogicApp;ClientSecret=YOUR_CLIENT_SECRET;UserName=YOUR_CONTENT_HUB_SUPERUSER_USER_NAME;Password=YOUR_CONTENT_HUB_SUPERUSER_PASSWORD;URI=https://YOUR_CONTENT_HUB_SANDBOX_NAME.sitecoresandbox.cloud/;`
   2. **CMP_ServiceBusEntityPathIn**: `Endpoint=sb://seps-run-sb-weu.servicebus.windows.net/;SharedAccessKeyName=Read;SharedAccessKey=YOUR_SHARED_ACCESS_KEY;EntityPath=hub_out_SOME_ID`
   3. **CMP_ServiceBusSubscription**: `hub_out_subscription`
   4. **CMP_ServiceBusEntityPathOut**: `Endpoint=sb://seps-run-sb-weu.servicebus.windows.net/;SharedAccessKeyName=Write;SharedAccessKey=YOUR_SHARED_ACCESS_KEY;EntityPath=hub_in_SOME_ID`
   5. **DAM_ContentHub**: `https://YOUR_CONTENT_HUB_SANDBOX_NAME.sitecoresandbox.cloud`
   6. **DAM_SearchPage**: `https://YOUR_CONTENT_HUB_SANDBOX_NAME.sitecoresandbox.cloud/en-us/sitecore-dam-connect/approved-assets`
3. Save the file.

## Running the Website

1. Ensure you have run the [prerequisites](#Prerequisites) above.
2. [Start the containers](../docker.md#Starting-the-Containers) and follow the login directions.
3. Wait for the startup script to open browser tabs for the rendered site and Sitecore Launchpad.

## Stopping the Website

Stop the website by [stopping the containers](../docker.md#Stopping-the-Containers).

## Starting Over

You can remove all databases and solr indexes content by following the [Docker starting over procedure](../docker.md#Starting-Over).

Changes to the front-end project must be reverted from your Git client.

## Developing the Website

### Developing the Platform Visual Studio Solution

#### Deploying the Platform Visual Studio Solution to the Running Containers

To deploy configuration, assemblies, and content from this project into your running Docker environment, run a Publish of it from Visual Studio.

#### Debugging the Platform Visual Studio Solution

To debug, you can attach to the `w3wp` process within the `cm` container from Visual Studio.

### Developing the Rendering Next.js Project

#### Deploying the Rendering Next.js Project

The content of the project is mapped to the Rendering container using a Docker volume. All changes to the sources trigger a recompile and can be seen live in the browser at [https://www.edge.localhost](https://www.edge.localhost).

#### Debugging the Rendering Next.js Project

Debugging of the Next.js application is possible by using the `start:connected` or `start` scripts (they do the same thing) from the Next.js `package.json`, and the pre-configured *Attach to Process* VS Code launch configuration.

### Items Serialization

If you change Sitecore content tree items, you must serialize these items using the Sitecore CLI and Sitecore Content Serialization (SCS). We created a PowerShell script to help with this. In an elevated PowerShell terminal:

```ps1
.\serpull.ps1
```

If you checkout a different branch while the containers are running or you manually modify serialized items, you must sync the serialized items back to the Sitecore databases. We created a PowerShell script to help with this. In an elevated PowerShell terminal:

```ps1
.\serpush.ps1
```
