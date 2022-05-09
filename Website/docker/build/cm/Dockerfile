# escape=`

ARG PARENT_IMAGE
ARG SOLUTION_IMAGE
ARG TOOLS_IMAGE
ARG CONTENTHUB_ASSETS_IMAGE

FROM ${SOLUTION_IMAGE} as solution
FROM ${TOOLS_IMAGE} as tools
FROM ${CONTENTHUB_ASSETS_IMAGE} AS ch_assets
FROM ${PARENT_IMAGE}

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

WORKDIR C:\inetpub\wwwroot

# Copy developer tools and entrypoint
COPY --from=tools C:\tools C:\tools

# Copy the Content Hub Connector Module
COPY --from=ch_assets C:\module\cm\content C:\module\ch_assets
RUN (robocopy C:\module\ch_assets C:\inetpub\wwwroot /S /XF System.Diagnostics.DiagnosticSource.dll);if ($lastexitcode -eq 0){write-host "Robocopy succeeded"}else{write-host $lastexitcode};

# Copy additional files to container
COPY ./Data/ /inetpub/wwwroot/

# Copy solution website files
COPY --from=solution /artifacts/sitecore/ ./

# Copy website images to allow displaying them in Horizon without EnableRelativeLinkProcessing
COPY --from=solution /artifacts/src/rendering/public ./

# Perform transforms
RUN (Get-ChildItem -Path 'C:\\inetpub\\wwwroot\\transforms\\web*.xdt' -Recurse ) | `
    ForEach-Object { & 'C:\\tools\\scripts\\Invoke-XdtTransform.ps1' -Path 'C:\\inetpub\\wwwroot\\web.config' -XdtPath $_.FullName `
    -XdtDllPath 'C:\\tools\\bin\\Microsoft.Web.XmlTransform.dll'; };
