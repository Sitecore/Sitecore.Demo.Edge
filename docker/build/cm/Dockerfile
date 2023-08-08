# escape=`

ARG PARENT_IMAGE
ARG SOLUTION_IMAGE
ARG TOOLS_IMAGE
ARG MANAGEMENT_SERVICES_IMAGE
ARG HEADLESS_SERVICES_IMAGE
ARG SPE_ASSETS_IMAGE
ARG CONTENTHUB_ASSETS_IMAGE
ARG EXPERIENCE_EDGE_ASSETS_IMAGE
ARG DELTA_ASSET_IMAGE

FROM ${SOLUTION_IMAGE} as solution
FROM ${TOOLS_IMAGE} as tools
FROM ${MANAGEMENT_SERVICES_IMAGE} AS management_services
FROM ${HEADLESS_SERVICES_IMAGE} AS headless_services
FROM ${SPE_ASSETS_IMAGE} AS spe_assets
FROM ${CONTENTHUB_ASSETS_IMAGE} AS ch_assets
FROM ${EXPERIENCE_EDGE_ASSETS_IMAGE} AS edge_assets
FROM ${DELTA_ASSET_IMAGE} as deltaAssetImage
FROM ${PARENT_IMAGE}

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

# Install GIT
WORKDIR C:\tools
RUN Invoke-WebRequest 'https://github.com/git-for-windows/git/releases/download/v2.30.1.windows.1/Git-2.30.1-64-bit.exe' -OutFile 'git.exe';
RUN Start-Process "c:\tools\git.exe" -ArgumentList '/SP-', '/VERYSILENT', '/NORESTART', '/NOCANCEL', '/CLOSEAPPLICATIONS', '/RESTARTAPPLICATIONS' -Wait -NoNewWindow;

WORKDIR C:\inetpub\wwwroot

# Copy developer tools and entrypoint
COPY --from=tools C:\tools C:\tools

# Copy the Sitecore Management Services Module
COPY --from=management_services C:\module\cm\content C:\inetpub\wwwroot

# Copy the Experience Edge Connector Module
COPY --from=edge_assets C:\module\cm\content C:\inetpub\wwwroot
COPY --from=edge_assets C:\module\cm\xdt C:\module\xdt

# Copy and init the JSS / Headless Services Module
COPY --from=headless_services C:\module\cm\content C:\inetpub\wwwroot
COPY --from=headless_services C:\module\tools C:\module\tools

RUN C:\module\tools\Initialize-Content.ps1 -TargetPath C:\inetpub\wwwroot; `
    C:\module\tools\xdt\Invoke-XdtTransformations.ps1 -TargetPath C:\inetpub\wwwroot -XdtPath C:\module\xdt; `
    Remove-Item -Path C:\module -Recurse -Force;

# Copy the SPE Module
COPY --from=spe_assets C:\module\cm\content C:\inetpub\wwwroot

# Copy the Content Hub Connector Module
COPY --from=ch_assets C:\module\cm\content C:\module\ch_assets
RUN (robocopy C:\module\ch_assets C:\inetpub\wwwroot /S /XF System.Diagnostics.DiagnosticSource.dll);if ($lastexitcode -eq 0){write-host "Robocopy succeeded"}else{write-host $lastexitcode};
COPY --from=ch_assets /module/transforms/cm/web.config.xdt /inetpub/wwwroot/transforms/web.config.chub.xdt
COPY --from=ch_assets /module/transforms/cm/App_Config/ConnectionStrings.config.xdt  /inetpub/wwwroot/transforms/App_Config/ConnectionStrings.config.chub.xdt

# Copy Product Hotfixes
# Enabled this if there is a hotfix package available for current version of Sitecore
# COPY --from=deltaAssetImage /platform/cm/inetpub/wwwroot/ /inetpub/wwwroot/

# Copy additinal files to container
COPY ./Data/ /inetpub/wwwroot/

# Copy custom entrypoint
COPY ./tools/ /tools/

# Copy solution website files
COPY --from=solution /artifacts/sitecore/ ./

# Copy website images to allow displaying them in Horizon without EnableRelativeLinkProcessing
COPY --from=solution /artifacts/src/rendering/public ./

# Perform transforms
RUN (Get-ChildItem -Path 'C:\\inetpub\\wwwroot\\transforms\\web*.xdt' -Recurse ) | `
    ForEach-Object { & 'C:\\tools\\scripts\\Invoke-XdtTransform.ps1' -Path 'C:\\inetpub\\wwwroot\\web.config' -XdtPath $_.FullName `
    -XdtDllPath 'C:\\tools\\bin\\Microsoft.Web.XmlTransform.dll'; };

RUN (Get-ChildItem -Path '/inetpub/wwwroot/transforms/App_Config/ConnectionStrings*.xdt' -Recurse ) | `
    ForEach-Object { & '/tools/scripts/Invoke-XdtTransform.ps1' -Path '/inetpub/wwwroot/app_config/ConnectionStrings.config' -XdtPath $_.FullName `
    -XdtDllPath '/tools/bin/Microsoft.Web.XmlTransform.dll'; };

ENTRYPOINT [ "powershell.exe", "C:\\tools\\entrypoints\\aks\\boot.ps1" ]
