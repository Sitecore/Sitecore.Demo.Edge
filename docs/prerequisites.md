# Prerequisites

## Demo Prerequisites

- Nodejs 14.17.x and npm 6.14.x
- .NET Core 3.1 SDK
- .NET Framework 4.8 SDK
- Visual Studio 2019
- Docker for Windows, with Windows containers enabled
- At least 16 Gb of memory (32 Gb or more is preferred)
- Windows 1809 or higher (version 1909 is preferred)
- A valid Sitecore 10 license file (preferrably located at `C:\license\license.xml` on the host system)
- Sitecore JSS CLI 18.0.0
  - Install it globally using `npm install -g @sitecore-jss/sitecore-jss-cli@18.0.0`

See [Sitecore Containers documentation](https://doc.sitecore.com/en/developers/101/developer-tools/set-up-the-environment.html) for more information on system requirements.

## 🐳 Preparing Docker

1. Ensure you are running Windows containers:
   1. From the Docker Desktop taskbar icon contextual menu (right click), you can toggle which daemon (Linux or Windows) the Docker CLI talks to. Select "Switch to Windows containers..." to use Windows containers.
2. Ensure the Windows Docker engine experimental features are enabled and Docker Compose V2 is disabled:

   > Experimental features must be enabled to allow the Linux mssql container to run at the same time as the Windows containers. Docker Compose V2 must be disabled as this project is not compatible with this version.

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

   6. In the left tab group, navigate to the "Experimental Features" tab.
   7. Ensure that the "Use Docker Compose V2" option is not checked.
   8. Click the "Apply & Restart" button to restart your Windows Docker engine.
