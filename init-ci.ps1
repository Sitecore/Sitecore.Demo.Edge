# init-ci.ps1 is a script for Sitecore employees and build pipeline.
# Do not execute this script otherwise.

Param (
  [Parameter(
    HelpMessage = "Demo version used in image tagging.")]
  [string]$DemoVersion = "latest"
  ,
  [Parameter(
    HelpMessage = "Internal ACR used by the demo team")]
  [string]$DemoTeamRegistry = ""
  ,
  [Parameter(
    HelpMessage = "Internal Sitecore ACR")]
  [string]$SitecoreRegistry = ""
  ,
  [Parameter(
    HelpMessage = "Process Isolation to use when building images")]
  [string]$IsolationMode = "default"
  ,
  [Parameter(
    HelpMessage = "Windows image version")]
  [string]$WindowsVersion = "ltsc2019"
  ,
  [Parameter(
    HelpMessage = "Sitecore version")]
  [string]$SitecoreVersion = "10.1.0"
)

$ErrorActionPreference = "Stop";

Write-Host "Preparing your Sitecore Containers environment!" -ForegroundColor Green

################################################
# Retrieve and import SitecoreDockerTools module
################################################
# Set correct TLS version
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Check for Sitecore Gallery
Import-Module PowerShellGet
$SitecoreGallery = Get-PSRepository | Where-Object { $_.Name -eq "SitecoreGallery" }
if (-not $SitecoreGallery) {
  Write-Host "Adding Sitecore PowerShell Gallery..." -ForegroundColor Green
  Register-PSRepository -Name SitecoreGallery -SourceLocation https://sitecore.myget.org/F/sc-powershell/api/v2 -InstallationPolicy Trusted -Verbose
  $SitecoreGallery = Get-PSRepository -Name SitecoreGallery
}
else {
  Write-Host "Updating Sitecore PowerShell Gallery url..." -ForegroundColor Yellow
  Set-PSRepository -Name $SitecoreGallery.Name -Source "https://sitecore.myget.org/F/sc-powershell/api/v2"
}

#Install and Import SitecoreDockerTools
$dockerToolsVersion = "10.1.4"
Remove-Module SitecoreDockerTools -ErrorAction SilentlyContinue
if (-not (Get-InstalledModule -Name SitecoreDockerTools -RequiredVersion $dockerToolsVersion -ErrorAction SilentlyContinue)) {
  Write-Host "Installing SitecoreDockerTools..." -ForegroundColor Green
  Install-Module SitecoreDockerTools -RequiredVersion $dockerToolsVersion -Scope CurrentUser -Repository $SitecoreGallery.Name
}
Write-Host "Importing SitecoreDockerTools..." -ForegroundColor Green
Import-Module SitecoreDockerTools -RequiredVersion $dockerToolsVersion

###############################
# Populate the environment file
###############################

Write-Host "Populating required demo team .env file values..." -ForegroundColor Green

if ([string]::IsNullOrEmpty($DemoTeamRegistry)) {
  # if it wasn't passed as a parameter, let's try to find it in environment
  $DemoTeamRegistry = $env:DEMO_TEAM_DOCKER_REGISTRY
}

if ($false -eq [string]::IsNullOrEmpty($DemoTeamRegistry)) {
  Set-DockerComposeEnvFileVariable "REGISTRY" -Value $DemoTeamRegistry
} else {
  Write-Host "The REGISTRY .env file variable was not modified. Please validate if this was intended." -ForegroundColor Yellow
}

if ([string]::IsNullOrEmpty($SitecoreRegistry)) {
  # if it wasn't passed as a parameter, let's try to find it in environment
  $SitecoreRegistry = $env:INTERNAL_SITECORE_DOCKER_REGISTRY
}

if ($false -eq [string]::IsNullOrEmpty($SitecoreRegistry)) {
  Set-DockerComposeEnvFileVariable "SITECORE_DOCKER_REGISTRY" -Value $SitecoreRegistry
} else {
  Write-Host "The SITECORE_DOCKER_REGISTRY .env file variable was not modified. Please validate if this was intended." -ForegroundColor Yellow
}

$NanoserverVersion = $(if ($WindowsVersion -eq "ltsc2019") { "1809" } else { $WindowsVersion })

Set-DockerComposeEnvFileVariable "DEMO_VERSION" -Value $DemoVersion
Set-DockerComposeEnvFileVariable "ISOLATION" -Value $IsolationMode
Set-DockerComposeEnvFileVariable "WINDOWSSERVERCORE_VERSION" -Value $WindowsVersion
Set-DockerComposeEnvFileVariable "NANOSERVER_VERSION" -Value $NanoserverVersion
Set-DockerComposeEnvFileVariable "SITECORE_VERSION" -Value $SitecoreVersion

Write-Host "Done!" -ForegroundColor Green
