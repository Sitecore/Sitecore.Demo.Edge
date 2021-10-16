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

This Visual Studio / MSBuild project is used to deploy code and configuration to the main Sitecore platform roles, known as Content Management. (This sample uses the XM1 container topology and thus only has a Standalone `cm`.)

To deploy configuration, assemblies, and content from this project into your running Docker environment, run a Publish of it from Visual Studio. To debug, you can attach to the `w3wp` process within the `cm` container.

### Rendering

#### Storybook

The project uses [Storybook](https://github.com/storybookjs/storybook) for "disconnected" development. Standard JSS "disconnected" mode has been removed. `jss start` runs connected and expects Sitecore to be running using the provided Docker-compose container environment.

To browse the existing stories, run `jss storybook`

To add a new story, create a `*.stories.tsx` file under `src\stories`. Use other files in that folder as an example.

If adding a component story, the title should be: `'Components/%Component Name Here%'`. For pages, it is `'Pages/%Page Name Here%'`.

`jss scaffold [%OptionalComponentPath%]%ComponentName%` will automatically create the related component story.

## Running the Website

### Running Prerequisites

1. If your local IIS is listening on port 443, you'll need to stop it.
   > This requires an elevated PowerShell or command prompt.

   ```ps1
   iisreset /stop
   ```

1. Before you can run the solution, you will need to prepare the following for the Sitecore container environment:
   - A valid/trusted wildcard certificate for `*.edge.localhost`
   - Hosts file entries for `edge.localhost`
   - Required environment variable values in `.env` for the Sitecore instance
     - (Can be done once, then checked into source control.)

   See Sitecore Containers documentation for more information on these preparation steps. The provided `init.ps1` will take care of them, but **you should review its contents before running.**

   > You must use an elevated/Administrator Windows PowerShell 5.1 prompt for this command, PowerShell 7 is not supported at this time.

    ```ps1
    .\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
    ```

    If you check your `.env` into source control, other developers can prepare a certificate and hosts file entries by simply running:

    ```ps1
    .\init.ps1
    ```

    > Out of the box, this example does not include `.env` in the `.gitignore`. Individual users may override values using process or system environment variables. This file does contain passwords that would provide access to the running containers in the developer's environment. If your Sitecore solution and/or its data are sensitive, you may want to exclude these from source control and provide another means of centrally configuring the information within.

1. If this is your first time using `mkcert` with NodeJs, you will need to set the `NODE_EXTRA_CA_CERTS` environment variable. This variable must be set in your user or system environment variables. The `init.ps1` script will provide instructions on how to do this.
    - Be sure to restart your terminal or VS Code for the environment variable to take effect.

1. After completing this environment preparation, run the startup script from the solution root:

    ```ps1
    .\up.ps1
    ```

1. Wait for the startup script to open browser tabs for the rendered sit and Sitecore Launchpad.

## Starting Over

The `.\clean.ps1` script here can be used to "reset" the state of your containers. It clears all mounted data and deployed/copied build output.

## 📦 What's Included

### 🐳 Docker

A `docker-compose` environment for a Sitecore XM1 topology.

The included `docker-compose.yml` is a stock XM1 environment from the Sitecore Container Support Package. All changes/additions for this solution are located in the `docker-compose.override.yml` file.

The environment has some extra containers:

#### Rendering Host

A Next.js rendering host container to render the main website. It runs the website in development mode with hot reloading.

#### Sitecore CDP Proxy

A Sitecore CDP proxy container that uses a private API key for authenticated calls to Sitecore CDP. This is to keep the API key secret.

#### Init Container

It runs some startup jobs (mostly when deployed to AKS and Vercel) and warms up the website.

## Using the Solution

- A Visual Studio / MSBuild publish of the `Platform` project will update the running `cm` service.
- The running `rendering` service uses `next dev` against the mounted Next.js application, and will recompile automatically for any changes you make.
- You can also run the Next.js application directly using `npm` commands within `src\rendering`.
- Debugging of the Next.js application is possible by using the `start:connected` or `start` scripts from the Next.js `package.json`, and the pre-configured *Attach to Process* VS Code launch configuration.
- Review README's found in the projects and throughout the solution for additional information.
