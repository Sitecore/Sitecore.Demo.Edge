# Website

## Project Description

Main PLAY! Summit website built with:

- Sitecore Experience Management (XM)
- Sitecore Experience Edge
- Sitecore Content Hub DAM and CMP
- Sitecore JavaScript Services (JSS)
- Sitecore CDP
- Sitecore Personalize
- Sitecore Discover
- Sitecore OrderCloud
- Next.js
- Tailwind CSS
- Storybook

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

It is intended that you work directly in Sitecore to define templates and renderings, instead of using the code-first/disconnected approach. This is also known as "Sitecore-first" JSS workflow. To support this:

- The JSS content workflow is disabled.
- Imported items will not be marked as 'protected'.
- JSS import warnings in the Content Editor and Experience Editor have been disabled.

### Serialized Sitecore Items

The `\items` folder contains serialized Sitecore content items for this demo. The serialized paths are configured in `*.module.json` files in the parent directory.

- `InitItems.module.json` configures items which this solution needs to push before deploying other items.
- `EdgeWebsite.module.json` contains developer-owned items for the website.
- `EdgeWebsite-Content.module.json` contains content items for the website. It's a good practice to put content into a separate module, so it can be excluded from packaging and deployment.
- `Roles.module.json` contains a custom demo Sitecore roles.

See [Sitecore Content Serialization documentation](https://doc.sitecore.com/xp/en/developers/103/developer-tools/sitecore-content-serialization.html) for more information.

### Sitecore Platform Project

This Visual Studio / MSBuild project is used to deploy code and configuration to the main Sitecore platform roles, known as Content Management (CM). (This sample uses the XM1 container topology and thus only has a Standalone `cm`.)

### Rendering Next.js Project

The `\rendering` folder contains the main website JSS Next.js project. The content of this folder is mapped to the Rendering container using a Docker volume. All changes to the sources trigger a recompile and can be seen live in the browser at [https://www.edge.localhost](https://www.edge.localhost).

You can also build or run the Next.js application directly using `npm` commands within `src\rendering`. It is not recommended to run both the rendering Docker container and the npm commands at the same time as both use the same output folder. Stop the rendering Docker container if you want to build or run the Next.js application using `npm` commands.

#### Storybook

The project uses [Storybook](https://github.com/storybookjs/storybook) for "disconnected" development. Standard JSS "disconnected" mode has been removed. `jss start` runs connected and expects Sitecore to be running using the provided Docker compose container environment.

To browse the existing stories, run `jss storybook` or `npm run storybook`.

To add a new story, create a `*.stories.tsx` file under `src\stories`. Use other files in that folder as an example.

If adding a component story, the title should be: `'Components/%Component Name Here%'`. For pages, it is `'Pages/%Page Name Here%'`.

`jss scaffold [%OptionalComponentPath%]%ComponentName%` will automatically create the related component story at the same time as the component file.

## Prerequisites

1. Ensure you have installed and followed the [global prerequisites](../prerequisites.md).
2. Ensure you have run the [Docker prerequisites](../docker.md#prerequisites).

### Optional: Sitecore CDP and Personalize Module Configuration

If you want the website to use Sitecore CDP and Personalize, you must follow the [Sitecore CDP and Personalize](../cdp-personalize/README.md) instructions.

### Optional: Sitecore Content Hub Module Configuration

If you want the website to use Sitecore Content Hub DAM and CMP, you must:

1. Edit the `.\.env` file.
2. Fill the following values:

   ```shell
   # Content Hub Connector
   CMP_ContentHub=ClientId=LogicApp;ClientSecret=YOUR_CLIENT_SECRET;UserName=YOUR_CONTENT_HUB_SUPERUSER_USER_NAME;Password=YOUR_CONTENT_HUB_SUPERUSER_PASSWORD;URI=https://YOUR_CONTENT_HUB_SANDBOX_NAME.sitecoresandbox.cloud/;
   CMP_ServiceBusEntityPathIn=Endpoint=sb://seps-run-sb-weu.servicebus.windows.net/;SharedAccessKeyName=Read;SharedAccessKey=YOUR_SHARED_ACCESS_KEY;EntityPath=hub_out_SOME_ID
   CMP_ServiceBusSubscription=hub_out_subscription
   CMP_ServiceBusEntityPathOut=Endpoint=sb://seps-run-sb-weu.servicebus.windows.net/;SharedAccessKeyName=Write;SharedAccessKey=YOUR_SHARED_ACCESS_KEY;EntityPath=hub_in_SOME_ID
   DAM_ContentHub=https://YOUR_CONTENT_HUB_SANDBOX_NAME.sitecoresandbox.cloud
   DAM_SearchPage=https://YOUR_CONTENT_HUB_SANDBOX_NAME.sitecoresandbox.cloud/en-us/sitecore-dam-connect/approved-assets
   ```

3. Save the file.

### Optional: Commerce Configuration

If you want the website to use Commerce, you must configure Sitecore OrderCloud, Sitecore Discover, and Auth0. To do that you must:

1. [Seed a Headstart OrderCloud marketplace](../ordercloud.md#headstart-seeding).
2. Edit the `.\.env` file.
3. Fill the following values (see table below for description)

   ```shell
   # Discover
   DISCOVER_CUSTOMER_KEY=YOUR_DISCOVER_CUSTOMER_KEY
   DISCOVER_API_KEY=YOUR_DISCOVER_API_KEY

   # OrderCloud
   ORDERCLOUD_BUYER_CLIENT_ID=YOUR_BUYER_APPLICATION_CLIENT_ID
   ORDERCLOUD_BASE_API_URL=YOUR_ORDERCLOUD_BASE_API_URL
   ORDERCLOUD_MIDDLEWARE_CLIENT_ID=YOUR_MIDDLEWARE_CLIENT_ID
   ORDERCLOUD_MIDDLEWARE_CLIENT_SECRET=YOUR_MIDDLEWARE_CLIENT_SECRET
   ORDERCLOUD_MIDDLEWARE_ALLOWED_CLIENTIDS=YOUR_ALLOWED_CLIENT_IDS
   ORDERCLOUD_WEBHOOK_HASH_KEY=YOUR_WEBHOOK_HASH_KEY

   # Auth0 Variables
   AUTH0_ENABLED=true
   ```

4. Save the file.

| Variable                                  | Description                                                                                                                                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ORDERCLOUD_BUYER_CLIENT_ID`              | Your buyer application ClientID. This [API Client](https://ordercloud.io/knowledge-base/api-clients) should be configured to allow anonymous shopping.                                            |
| `ORDERCLOUD_BASE_API_URL`                 | The base URL for accessing the ordercloud api. Generally in the shape https://{region}-{environment}.ordercloud.io. Access in portal when viewing your Marketplace.                               |
| `ORDERCLOUD_MIDDLEWARE_CLIENT_ID`         | Your middleware application ClientID. This [API Client](https://ordercloud.io/knowledge-base/api-clients) should be configured with `AllowSeller=true` as well as with a `DefaultContextUsername` |
| `ORDERCLOUD_MIDDLEWARE_CLIENT_SECRET`     | Your middleware application ClientSecret                                                                                                                                                          |
| `ORDERCLOUD_MIDDLEWARE_ALLOWED_CLIENTIDS` | A comma delimited list of API ClientIDs that should be allowed to call out to them middleware endpoints. Generally this should be just `ORDERCLOUD_BUYER_CLIENT_ID`                               |
| `ORDERCLOUD_WEBHOOK_HASH_KEY`             | A long secret value used to encrypt and validate webhook requests. You can generate a suitable string using openssl rand -hex 32 on the command line                                              |
| `DISCOVER_CUSTOMER_KEY`                   | Your Discover Customer Key. In the Discover CEC under Developer Resources > API Access                                                                                                            |
| `DISCOVER_API_KEY`                        | Your Discover API Key. In the Discover CEC under Developer Resources > API Access                                                                                                                 |
| `AUTH0_ENABLED`                           | `true` to enable Auth0 authentication                                                                                                                                                             |

### Optional: Custom Auth0 Configuration

The shop section of the demo comes with a default Auth0 configuration that works for development. It allows your users to log in via single sign on (Auth0) as well as access logged-in user flows. If you wish to use your own Auth0 account, you must have configured commerce and have access to an [auth0](https://auth0.com) instance.

1. Follow [instructions here](../ordercloud.md#configuring-single-sign-on) to configure OrderCloud for single sign on.
2. Edit the `.\.env` file.
3. Fill the following values (see table below for description and checkout Configuring OpenID Connect Integration).

   ```shell
   # OrderCloud
   ORDERCLOUD_OPENID_CONNECT_ID=YOUR_OPENID_CONNECT_ID

   # Auth0 Variables
   AUTH0_SECRET=use [openssl rand -hex 32] to generate a 32 bytes value
   AUTH0_BASE_URL=https://www.edge.localhost/shop
   AUTH0_ISSUER_BASE_URL=https://YOUR_DOMAIN
   AUTH0_CLIENT_ID=YOUR_CLIENT_ID
   AUTH0_CLIENT_SECRET=YOUR_CLIENT_SECRET
   AUTH0_ENABLED=true
   ```

4. Save the file.

| Variable                       | Description                                                                                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `AUTH0_SECRET`                 | A long secret value used to encrypt the session cookie. You can generate a suitable string using openssl rand -hex 32 on the command line                                                  |
| `AUTH0_BASE_URL`               | The base URL of your application. Used to redirect the user after logout.                                                                                                                  |
| `AUTH0_ISSUER_BASE_URL`        | The URL of your Auth0 tenant domain. If you are using a Custom Domain with Auth0, set this to the value of your Custom Domain instead of the value reflected in the "Settings" tab         |
| `AUTH0_CLIENT_ID`              | Your Auth0 application's Client ID                                                                                                                                                         |
| `AUTH0_CLIENT_SECRET`          | Your Auth0 application's Client Secret                                                                                                                                                     |
| `AUTH0_ENABLED`                | `true` or `false` indicating whether or not auth0 is configured, must be true for profiled user features to appear                                                                         |
| `ORDERCLOUD_OPENID_CONNECT_ID` | The ID of the [OpenID Connect Configuration](https://ordercloud.io/api-reference/authentication-and-authorization/open-id-connects/save) that should be used for single sign on with auth0 |

## Running the Website

1. Ensure you have run the [prerequisites](#prerequisites) above.
2. [Start the containers](../docker.md#starting-the-containers) and follow the login directions.
3. Wait for the startup script to open browser tabs for the rendered site and Sitecore Launchpad.
4. If you [enabled commerce](#optional-commerce-configuration) before running the website:
   1. [Configure the Headstart OrderCloud marketplace for PLAY! SHOP](../ordercloud.md#play-shop-seeding).

## Stopping the Website

Stop the website by [stopping the containers](../docker.md#stopping-the-containers).

## Starting Over

You can remove all databases and solr indexes content by following the [Docker starting over procedure](../docker.md#starting-over).

Changes to the front-end project must be reverted from your Git client.

## Developing the Website

### Best Practices

#### Never Use a Paragraph Element For a JSS RichText Component

Using a RichText JSS element with a `tag="p"` prop causes issues when editing the element in Horizon. To be specific, Horizon will wrap your plain text inside a paragraph which results in nested `p` tags and an invalid HTML. For this reason it is suggested to use a block element that has no children restrictions like `div`, `section`, `blockquote`, etc.

#### Use an Item ID Instead of an Item Path For Rendering Items Datasources

When creating a rendering for a new Sitecore Component refrain from using paths as Datasources or inside GraphQL queries. Instead replace them with the corresponding Item IDs, so that renaming the items does not cause any issues later on.

### Custom Renderings Icons

#### Adding New Icons

To add new icons to the EdgeIcons pack download your selected icons in a `.png` format and 100x100 px in size. When you have your desired icons you should add it to all four subfolders in `Sitecore.Demo.Edge\Website\src\icons`.

#### Generating the ZIP file

In order to be able to use the icons as rendering icons they need to be in a `.zip` format with the following structure: `EdgeIcons.zip\EdgeIcons\[size]x[size]`. To create a zip file right-click the EdgeIcons folder and select _Send to > Compressed (zipped) folder_.

#### Quick Deploy and Test Icons

To test your new zip you can upload it to `Sitecore.Demo.Edge\Website\deploy\sitecore\shell\Themes\Standard`. It will automatically deploy them to your local cm container and you will be able to use and test them immediately.

#### Choosing a Rendering Icon

When creating a new rendering you should select an appropriate icon for it. The custom Edge icons are located in `\sitecore\shell\Themes\Standard\EdgeIcons`. To select an icon, click on the icon of the rendering item and write the relative path to the selected icon (e.g. `edgeicons/32x32/breadcrumb.png`).

#### Adding Icons to the Docker Build

In order for your new icons to be available in all newly built instances, the new ZIP file needs to be added to the Docker build. In order to do that you should replace the existing ZIP file in `Sitecore.Demo.Edge\docker\build\cm\Data\sitecore\shell\Themes` with your new version.

#### Credits

All icons are by [icons8](https://icons8.com/icons/color).

### Developing the Platform Visual Studio Solution

#### Deploying the Platform Visual Studio Solution to the Running Containers

To deploy configuration, assemblies, and content from this project into your running Docker environment, run a Publish of it from Visual Studio.

#### Debugging the Platform Visual Studio Solution

To debug, you can attach to the `w3wp` process within the `cm` container from Visual Studio.

### Developing the Rendering Next.js Project

#### Deploying the Rendering Next.js Project

The content of the project is mapped to the Rendering container using a Docker volume. All changes to the sources trigger a recompile and can be seen live in the browser at [https://www.edge.localhost](https://www.edge.localhost).

#### Debugging the Rendering Next.js Project

Debugging of the Next.js application is possible by using the `start:connected` or `start` scripts (they do the same thing) from the Next.js `package.json`, and the pre-configured _Attach to Process_ VS Code launch configuration.

#### Building the Rendering Next.js Project Locally

If you ever have to build the Next.js application in a command line:

1. Stop the "rendering" Docker container.
   - Because the rendering container has a mapped folder to `.\Website\src\rendering` and is running `npm run dev`, it shares the same build output folder as `next build`. Building for production while the container is running will produce all kind of errors.
2. Run `npm run build:local`
   - Some website code depends on environment variables that are set through the rendering Docker container. When building in a command line, those environment variables require fake values for the build to succeed. This command sets those fake values before starting the build.

When you are done:

1. Start the "rendering" Docker container.

#### Creating new website front-end components

##### Create components by name

You can create new website components with the scaffolding script providing only the name for your component. In order to do so, open a terminal window in the root directory of the JSS application and run `jss scaffold ComponentName` or `npm run scaffold ComponentName`. This command will create the component inside `src/components` and also create the respective component story inside `src/stories`.

##### Create components by path

If you want to group your components in sub-directories of the folder src/components, you can create components with the scaffolding script providing the directory path and name for the component. In order to do so, open a terminal window in the root directory of the JSS application and run `jss scaffold some/new/path/ComponentName` or `npm run scaffold some/new/path/ComponentName`. This command will create the component inside `src/components/some/new/path/` and also create the respective component story inside `src/stories/some/new/path`.

##### Removing the withDatasourceCheck() higher order component

You should remove the withDatasourceCheck() HOC and just export the component itself in these cases below:

1. Components that will use the Sitecore context item as source
2. Components without any props
3. Components that live in the NonSitecore subfolder

##### Avoiding logic in the JSX

It is good practice to avoid using conditional logic in the JSX return statement, therefore you should prefer using consts for pieces of code the execution of which differs based on conditions and then reference those consts in the return statement.

##### Styling the component

If you want to add some styling to the newly created component then you should create a file named `ComponentName.css` either inside `src/assets/css/components` if you previously created the component by name or inside `src/assets/css/components/some/new/path` if you previosuly created the component by path. The parent class should be named after the component and all children selectors should be inside this one e.g.

```css
.component-name {
  h1 {
    ...;
  }

  &-grid {
    ...;

    &-item {
      ...;
    }
  }
}
```

### Items Serialization

If you change Sitecore content tree items, you must serialize these items using the Sitecore CLI and Sitecore Content Serialization (SCS). We created a PowerShell script to help with this. In an elevated PowerShell terminal:

```ps1
.\serpull.ps1
```

If you checkout a different branch while the containers are running or you manually modify serialized items, you must sync the serialized items back to the Sitecore databases. We created a PowerShell script to help with this. In an elevated PowerShell terminal:

```ps1
.\serpush.ps1
```
