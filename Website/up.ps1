# DEMO TEAM CUSTOMIZATION - Add ability to skip building the containers, skip running the init container, and use pre-release versions.
[CmdletBinding(DefaultParameterSetName = "no-arguments")]
Param (
    [Parameter(HelpMessage = "Whether to skip building the Docker images.")]
    [switch]$SkipBuild,

    [Parameter(HelpMessage = "Whether to skip running init container.")]
    [switch]$SkipInit,

    [Parameter(HelpMessage = "Whether to set up the environment with pre-release version of Sitecore products (internal only) .")]
    [switch]$PreRelease
)

$ErrorActionPreference = "Stop";

$envContent = Get-Content .env -Encoding UTF8
$xmCloudHost = $envContent | Where-Object { $_ -imatch "^CM_HOST=.+" }
$xmCloudDeployConfig = $envContent | Where-Object { $_ -imatch "^XMCLOUDDEPLOY_CONFIG=.+" }
$sitecoreDockerRegistry = $envContent | Where-Object { $_ -imatch "^SITECORE_DOCKER_REGISTRY=.+" }
$sitecoreVersion = $envContent | Where-Object { $_ -imatch "^SITECORE_VERSION=.+" }

$xmCloudHost = $xmCloudHost.Split("=")[1]
$xmCloudDeployConfig = $xmCloudDeployConfig.Split("=")[1]
$sitecoreDockerRegistry = $sitecoreDockerRegistry.Split("=")[1]
$sitecoreVersion = $sitecoreVersion.Split("=")[1]

# Double check whether init has been run
$envCheckVariable = "HOST_LICENSE_FOLDER"
$envCheck = $envContent | Where-Object { $_ -imatch "^$envCheckVariable=.+" }
if (-not $envCheck) {
    if (Test-Path "C:\License") {
        Write-Host "Initializing environment using default values" -ForegroundColor Yellow
        & .\init.ps1 -InitEnv -AdminPassword b -LicenseXmlPath C:\License\license.xml
        if ($PreRelease) {
            & .\init-ci.ps1 -PreRelease
        }
        else {
            & .\init-ci.ps1
        }
    }
    else {
        throw "$envCheckVariable does not have a value. Did you run 'init.ps1 -InitEnv'?"
    }
}

Write-Host "Keeping XM Cloud base image up to date" -ForegroundColor Green
docker pull "$($sitecoreDockerRegistry)sitecore-xmcloud-cm:$($sitecoreVersion)"

# DEMO TEAM CUSTOMIZATION - Add ability to skip building the containers.
if (-not $SkipBuild) {
    # Build all containers in the Sitecore instance, forcing a pull of latest base containers
    Write-Host "Building containers..." -ForegroundColor Green
    docker-compose build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Container build failed, see errors above."
    }
}

# Start the Sitecore instance
Write-Host "Starting Sitecore environment..." -ForegroundColor Green
docker-compose up -d

# Wait for Traefik to expose CM route
Write-Host "Waiting for CM to become available..." -ForegroundColor Green
$startTime = Get-Date
do {
    Start-Sleep -Milliseconds 100
    try {
        $status = Invoke-RestMethod "http://localhost:8079/api/http/routers/cm-secure@docker"
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -ne "404") {
            throw
        }
    }
} while ($status.status -ne "enabled" -and $startTime.AddSeconds(15) -gt (Get-Date))
if (-not $status.status -eq "enabled") {
    $status
    Write-Error "Timeout waiting for Sitecore CM to become available via Traefik proxy. Check CM container logs."
}

Write-Host "Restoring Sitecore CLI..." -ForegroundColor Green
    dotnet tool restore
Write-Host "Installing Sitecore CLI Plugins..."
dotnet sitecore --help | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Error "Unexpected error installing Sitecore CLI Plugins"
}

# update XM Cloud Deploy plugin
$pluginJsonFiles = Get-ChildItem -path "$PSScriptRoot\.sitecore\package-cache\nuget\Sitecore.DevEx.Extensibility.XMCloud.*" -filter plugin.json -Recurse
$pluginJsonContent = Get-Content $xmCloudDeployConfig
foreach ($pluginJsonFile in $pluginJsonFiles) {
    $pluginJsonContent | Set-Content -Path $pluginJsonFile.FullName
}

Write-Host "Logging into Sitecore..." -ForegroundColor Green
dotnet sitecore cloud login
dotnet sitecore login --ref xmcloud --cm https://$xmCloudHost --allow-write true

if ($LASTEXITCODE -ne 0) {
    Write-Error "Unable to log into Sitecore, did the Sitecore environment start correctly? See logs above."
}

# Populate Solr managed schemas to avoid errors during item deploy
Write-Host "Populating Solr managed schema..." -ForegroundColor Green
dotnet sitecore index schema-populate
if ($LASTEXITCODE -ne 0) {
    Write-Error "Populating Solr managed schema failed, see errors above."
}

# DEMO TEAM CUSTOMIZATION - Moved index rebuild

# DEMO TEAM CUSTOMIZATION - Removed initial JSS app items deployment and serialization. We are developing in Sitecore-first mode. Moved publish to a later stage.
# JSS sample has already been deployed and serialized, push the serialized items
Write-Host "Pushing items to Sitecore..." -ForegroundColor Green
dotnet sitecore ser push
if ($LASTEXITCODE -ne 0) {
    Write-Error "Serialization push failed, see errors above."
}

# DEMO TEAM CUSTOMIZATION - Moved index indexe here.
# Rebuild indexes
Write-Host "Rebuilding indexes ..." -ForegroundColor Green
dotnet sitecore index rebuild
if ($LASTEXITCODE -ne 0) {
    Write-Error "Rebuild indexes failed, see errors above."
}

# DEMO TEAM CUSTOMIZATION - Enable/Run/Disable init container
if (-not $SkipInit) {
    # Check for Sitecore Gallery
    Import-Module PowerShellGet
    $SitecoreGallery = Get-PSRepository | Where-Object { $_.SourceLocation -eq "https://sitecore.myget.org/F/sc-powershell/api/v2" }
    if (-not $SitecoreGallery) {
        Write-Host "Adding Sitecore PowerShell Gallery..." -ForegroundColor Green
        Register-PSRepository -Name SitecoreGallery -SourceLocation https://sitecore.myget.org/F/sc-powershell/api/v2 -InstallationPolicy Trusted
        $SitecoreGallery = Get-PSRepository -Name SitecoreGallery
    }

    # Install and Import SitecoreDockerTools
    $dockerToolsVersion = "10.2.7"
    Remove-Module SitecoreDockerTools -ErrorAction SilentlyContinue
    if (-not (Get-InstalledModule -Name SitecoreDockerTools -RequiredVersion $dockerToolsVersion -ErrorAction SilentlyContinue)) {
        Write-Host "Installing SitecoreDockerTools..." -ForegroundColor Green
        Install-Module SitecoreDockerTools -RequiredVersion $dockerToolsVersion -Scope CurrentUser -Repository $SitecoreGallery.Name
    }
    Write-Host "Importing SitecoreDockerTools..." -ForegroundColor Green
    Import-Module SitecoreDockerTools -RequiredVersion $dockerToolsVersion

    Write-Host "Running init container..." -ForegroundColor Green
    Set-DockerComposeEnvFileVariable "INIT_CONTAINERS_COUNT" -Value 1
    docker-compose up -d init
    Set-DockerComposeEnvFileVariable "INIT_CONTAINERS_COUNT" -Value 0
}

Write-Host "Opening site..." -ForegroundColor Green

Start-Process https://cm.xmcloudcm.localhost/sitecore/
Start-Process https://www.xmcloudcm.localhost/

Write-Host ""
Write-Host "Use the following command to monitor your Rendering Host:" -ForegroundColor Green
Write-Host "docker-compose logs -f rendering"
Write-Host ""
