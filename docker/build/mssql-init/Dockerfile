# escape=`

ARG PARENT_IMAGE
ARG SOLUTION_IMAGE
ARG HEADLESS_SERVICES_IMAGE
ARG SPE_ASSETS_IMAGE
ARG CONTENTHUB_ASSETS_IMAGE

FROM ${SOLUTION_IMAGE} as solution
FROM ${HEADLESS_SERVICES_IMAGE} AS headless_services
FROM ${SPE_ASSETS_IMAGE} AS spe_assets
FROM ${CONTENTHUB_ASSETS_IMAGE} AS ch_assets
FROM ${PARENT_IMAGE}

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

RUN Install-PackageProvider -Name NuGet -Force; `
    Set-PackageSource -Name PSGallery -Trusted ; `
    Install-Module -Name SqlServer;

COPY --from=headless_services /module/db /jss_data
COPY --from=spe_assets /module/db /spe_data
COPY --from=ch_assets /module/db /ch_data

COPY ./sql /sql
COPY ./tools/scripts\ .\

RUN .\InstallPrerequisites.ps1;
