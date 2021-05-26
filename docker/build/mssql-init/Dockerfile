# escape=`

ARG BASE_IMAGE
ARG HEADLESS_SERVICES_IMAGE
ARG SPE_ASSETS_IMAGE

FROM ${HEADLESS_SERVICES_IMAGE} AS headless_services
FROM ${SPE_ASSETS_IMAGE} AS spe_assets
FROM ${BASE_IMAGE}

RUN Install-PackageProvider -Name NuGet -Force; `
    Set-PackageSource -Name PSGallery -Trusted ; `
    Install-Module -Name SqlServer;

COPY ./sql /sql
COPY ./tools/scripts\ .\
COPY ./data /data
COPY --from=headless_services /module/db /jss_data
COPY --from=spe_assets /module/db /spe_data

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

RUN .\InstallPrerequisites.ps1;
