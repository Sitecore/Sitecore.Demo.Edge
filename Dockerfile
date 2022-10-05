# escape=`

# This Dockerfile will build the Sitecore solution and save the build artifacts for use in
# other images, such as 'cm' and 'rendering'. It does not produce a runnable image itself.

ARG BUILD_IMAGE

# In a separate image (as to not affect layer cache), gather all NuGet-related solution assets, so that
# we have what we need to run a cached NuGet restore in the next layer:
# https://stackoverflow.com/questions/51372791/is-there-a-more-elegant-way-to-copy-specific-files-using-docker-copy-to-the-work/61332002#61332002
# This technique is described here:
# https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-3.1#the-dockerfile-1
FROM ${BUILD_IMAGE} AS nuget-prep
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]
COPY Website/*.sln Website/nuget.config Website/Directory.Build.targets Website/Packages.props /nuget/
COPY Website/src/ /temp/
RUN Invoke-Expression 'robocopy C:/temp C:/nuget/src /s /ndl /njh /njs *.csproj *.scproj packages.config'

FROM ${BUILD_IMAGE} AS builder
ARG BUILD_CONFIGURATION

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

# Ensure updated nuget. Depending on your Windows version, dotnet/framework/sdk:4.8 tag may provide an outdated client.
# See https://github.com/microsoft/dotnet-framework-docker/blob/1c3dd6638c6b827b81ffb13386b924f6dcdee533/4.8/sdk/windowsservercore-ltsc2019/Dockerfile#L7
ENV NUGET_VERSION 5.8.1
# DEMO TEAM CUSTOMIZATION - Add TLS 1.2 protocol
RUN [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; `
    Invoke-WebRequest "https://dist.nuget.org/win-x86-commandline/v$env:NUGET_VERSION/nuget.exe" -UseBasicParsing -OutFile "$env:ProgramFiles\NuGet\nuget.exe"

# DEMO TEAM CUSTOMIZATION - Needed?
# Install latest PackageProvider (required for Sitecore.Courier)
RUN [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; `
    Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force

WORKDIR /build

# Copy prepped NuGet artifacts, and restore as distinct layer to take advantage of caching.
COPY --from=nuget-prep ./nuget ./

# Restore NuGet packages
RUN nuget restore -Verbosity quiet

# Copy remaining source code
COPY Website/src/ ./src/

# Build the Sitecore main platform artifacts
RUN msbuild .\src\platform\Platform.csproj /p:Configuration=$env:BUILD_CONFIGURATION /m /p:DeployOnBuild=true /p:PublishProfile=Local

# DEMO TEAM CUSTOMIZATION - New project
RUN msbuild .\src\Foundation\BranchPresets\Sitecore.Demo.Edge.Foundation.BranchPresets.csproj /p:Configuration=$env:BUILD_CONFIGURATION /m /p:DeployOnBuild=true /p:PublishProfile=Local

# Save the artifacts for copying into other images (see 'cm' and 'rendering' Dockerfiles).
FROM ${BUILD_IMAGE}
WORKDIR /artifacts
# DEMO TEAM CUSTOMIZATION - Removed the platform subfolder
COPY --from=builder /build/deploy  ./sitecore/

# DEMO TEAM CUSTOMIZATION - Copy sources for initcontainer to deploy the front-end projects to Vercel
COPY Website/src/ ./src
# DEMO TEAM CUSTOMIZATION - Extra projects
COPY tv/ ./src/tv
COPY kiosk/ ./src/kiosk