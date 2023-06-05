# 🐳 Docker

The PLAY! Summit demo comes with a Docker compose environment for a Sitecore XM1 topology.

The included `docker-compose.yml` is a stock XM1 environment from the Sitecore Container Support Package. All changes/additions for this solution are located in the `docker-compose.override.yml` file.

The environment has some extra containers:

- **rendering**: A Next.js rendering host container to render the main website. It runs the website in development mode with hot reloading.
- **init**: An initialization container that runs some startup jobs (mostly when deployed to AKS and Vercel) and warms up the main website.
- **headstart-middleware, headstart-seller, cosmos, and headstart-storage**: Set of containers to run the OrderCloud Headstart seller UI when demoing PLAY! Shop.

## Prerequisites

Do these prerequisites before you start the main website or the kiosk projects.

Ensure you have installed and followed the [global prerequisites](prerequisites.md).

### Installing Docker Desktop

[Docker Desktop](https://docs.docker.com/desktop/release-notes/#4180) version 4.18.0 maximum must be installed.

**Note:** Docker Desktop v4.19.0+ contains Docker Engine v23.0+ which does not have the experimental support for Linux containers on Windows (LCOW) anymore. This demo uses this Docker Engine feature. Source: [https://docs.docker.com/engine/deprecated/#linux-containers-on-windows-lcow-experimental](https://docs.docker.com/engine/deprecated/#linux-containers-on-windows-lcow-experimental)

### Preparing Docker

1. Ensure you are running Windows containers:
   1. From the Docker Desktop taskbar icon contextual menu (right click), you can toggle which daemon (Linux or Windows) the Docker CLI talks to. Select "Switch to Windows containers..." to use Windows containers.
2. Ensure the Windows Docker engine experimental features and Docker Compose V2 are enabled:

   > Experimental features must be enabled to allow the Linux mssql container to run at the same time as the Windows containers. Docker Compose V2 must be enabled as this project is only compatible with this version.

   1. From the Docker Desktop taskbar icon contextual menu (right click), choose "Settings".
   2. In the left tab group, navigate to the "Docker Engine" tab.
   3. In the JSON block, locate the `"experimental"` key.
      1. If you do not have an `"experimental"` key, add it after the existing ones. Ensure you add a comma (`,`) after the previous key/value pair.
   4. Ensure the value of the `"experimental"` key is set to `true`.
   5. At the end, the JSON block should have at least:

      ```json
      {
        "experimental": true
      }
      ```

   6. In the left tab group, navigate to the "General" tab.
   7. Ensure that the "Use Docker Compose V2" option is checked.
   8. Click the "Apply & Restart" button to restart your Windows Docker engine.

### Environment Initialization

> You must use an elevated/Administrator Windows PowerShell 5.1 prompt for these commands, PowerShell 7 is not supported at this time.

In an elevated PowerShell terminal:

1. If your local IIS is listening on port 443, you'll need to stop it.

   ```ps1
   iisreset /stop
   ```

2. Before you can run the containers, you will need to run a script to prepare the following for the Sitecore container environment:
   - A valid/trusted wildcard certificate for `*.edge.localhost`
   - Hosts file entries for `edge.localhost`
   - Required environment variable values in `.env` for the Sitecore instance

   The provided `init.ps1` will take care of them.

   > You must use an elevated/Administrator Windows PowerShell 5.1 prompt for this command, PowerShell 7 is not supported at this time.

    ```ps1
    .\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\your\license.xml" -AdminPassword "DesiredAdminPassword"
    ```

    > **⚠ WARNING:** Never commit the changes to the `.env` files unless they are changes you manually made while working on a feature/fix.

3. If this is your first time using `mkcert` with NodeJs, you will need to set the `NODE_EXTRA_CA_CERTS` environment variable. This variable must be set in your user or system environment variables. The `init.ps1` script will provide instructions on how to do this.
    - Be sure to restart your terminal or VS Code for the environment variable to take effect.

## Starting the Containers

In an elevated PowerShell terminal:

1. Ensure you have run the [prerequisites](#Prerequisites) above.

2. After completing this environment preparation, run the startup script from the solution root:

    ```ps1
    .\up.ps1
    ```

3. A browser tab will open after the containers are started for the script to get an Identity Server token.
   1. You must log in using the `superuser` admin account and the password you choose previously.
   2. Then you must click the `Yes, Allow` button to confirm the authorization request.
   3. You can close the browser tab.

## Stopping the Containers

The Linux MSSQL container is super slow to terminate when using the `docker compose down` command. We created a script to speed up containers termination. In an elevated PowerShell terminal:

```ps1
.\down.ps1
```

## Starting Over

A script can be used to "reset" the state of your containers. It clears all mounted data and deployed/copied build output. In an elevated PowerShell terminal:

1. Ensure you have [stopped the containers](#Stopping-the-Containers).
2. Run the script:

    ```ps1
    .\clean.ps1
    ```

## Troubleshooting

### General Troubleshooting

If you have trouble with Docker, it is recommended to run the [Sitecore containers prerequisite checker script](https://github.com/strezag/sitecore-containers-prerequisites) by Gabriel Streza.

If you have issues building Docker images or if that prerequisite checker identifies a conflicting driver, it might be caused by the "Box.com" software. If it is installed on your system and you are not using it, try uninstalling it.

### Docker Desktop v4.14 and 4.15

#### Problem

When starting the containers, you might encounter an error mentioning `open \.\pipe\docker_engine_windows: The system cannot find the file specified.`

#### Cause

Docker Desktop v4.14 and 4.15 have an issue with Windows containers.

#### Solutions

There are a few solutions available:

- Rollback to Docker Desktop v4.13.
- Running a few commands and creating a few files.
- Creating a registry key.

For more details about the problem, causes, and solutions, read [Jeremy Davis' blog post](https://blog.jermdavis.dev/posts/2022/fix-broken-pipe-docker-engine-windows).
