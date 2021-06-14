# Sitecore.Demo.Edge

This repository is used for the primary Sitecore Edge for Content Hub and Experience Management

## Preparing Docker

1. Ensure you are running Windows containers:
   1. From the Docker Desktop taskbar icon contextual menu (right click), you can toggle which daemon (Linux or Windows) the Docker CLI talks to. Select "Switch to Windows containers..." to use Windows containers.
2. Ensure the Windows Docker engine experimental features are enabled (to allow the Linux smtp container to run at the same time as the Windows containers):
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

   6. Click the "Apply & Restart" button to restart your Windows Docker engine.
3. Ensure you are using the proper Node Version.
   1. run `node -v`
   2. Make sure you have installed and using version 14.17.0.
