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
  ,
  [Parameter(
    HelpMessage = "Internal Sitecore NuGet source")]
  [string]$SitecoreNugetSource = ""
  ,
  [Parameter(
    HelpMessage = "Internal Sitecore2 NuGet source")]
  [string]$Sitecore2NugetSource = ""
  ,
  [Parameter(
    HelpMessage = "Internal SitecoreGallery NuGet source")]
  [string]$SitecoreGalleryNugetSource = ""
  ,
  [Parameter(
    HelpMessage = "Internal NuGet user name")]
  [string]$NugetUser = ""
  ,
  [Parameter(
    HelpMessage = "Internal NuGet password")]
  [string]$NugetPassword = ""
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

############################
# Edit the nuget.config file
############################

Write-Host "Editing nuget.config file..." -ForegroundColor Green

if (!$PSScriptRoot) {
  $PSScriptRoot = Split-Path $MyInvocation.MyCommand.Path -Parent
}

$TOOLS_DIR = Join-Path $PSScriptRoot "tools"
$NUGET_EXE = Join-Path $TOOLS_DIR "nuget.exe"
$NUGET_URL = "https://dist.nuget.org/win-x86-commandline/latest/nuget.exe"
$NUGET_CONFIG = Join-Path $PWD -ChildPath Website | Join-Path -ChildPath nuget.config

if ([string]::IsNullOrEmpty($NugetUser)) {
  # if it wasn't passed as a parameter, let's try to find it in environment
  $NugetUser = $env:INTERNAL_NUGET_SOURCE_USERNAME
}
if ([string]::IsNullOrEmpty($NugetUser)) {
  Write-Host "The NuGet user was not provided. Please validate if this was intended." -ForegroundColor Yellow
}
if ([string]::IsNullOrEmpty($NugetPassword)) {
  # if it wasn't passed as a parameter, let's try to find it in environment
  $NugetPassword = (& { if ([string]::IsNullOrEmpty("$env:INTERNAL_NUGET_SOURCE_PASSWORD")) { "$env:SYSTEM_ACCESSTOKEN" } else { "$env:INTERNAL_NUGET_SOURCE_PASSWORD" } })
}
if ([string]::IsNullOrEmpty($NugetPassword)) {
  Write-Host "The NuGet password was not provided. Please validate if this was intended." -ForegroundColor Yellow
}
$NUGET_CREDENTIALS_PROVIDED = (($false -eq [string]::IsNullOrEmpty($NugetUser)) -and ($false -eq [string]::IsNullOrEmpty($NugetPassword)))

function GetProxyEnabledWebClient {
  $wc = New-Object System.Net.WebClient
  $proxy = [System.Net.WebRequest]::GetSystemWebProxy()
  $proxy.Credentials = [System.Net.CredentialCache]::DefaultCredentials
  $wc.Proxy = $proxy
  return $wc
}

function EnsureNugetExe {
  # Make sure tools folder exists
  if ((Test-Path $PSScriptRoot) -and !(Test-Path $TOOLS_DIR)) {
    Write-Verbose -Message "Creating tools directory..."
    New-Item -Path $TOOLS_DIR -Type directory | out-null
  }

  # Try find NuGet.exe in path if not exists
  if (!(Test-Path $NUGET_EXE)) {
    Write-Verbose -Message "Trying to find nuget.exe in PATH..."
    $existingPaths = $Env:Path -Split ';' | Where-Object { (![string]::IsNullOrEmpty($_)) -and (Test-Path $_ -PathType Container) }
    $NUGET_EXE_IN_PATH = Get-ChildItem -Path $existingPaths -Filter "nuget.exe" | Select-Object -First 1
    if ($null -ne $NUGET_EXE_IN_PATH -and (Test-Path $NUGET_EXE_IN_PATH.FullName)) {
      Write-Verbose -Message "Found in PATH at $($NUGET_EXE_IN_PATH.FullName)."
      $NUGET_EXE = $NUGET_EXE_IN_PATH.FullName
    }
  }

  # Try download NuGet.exe if not exists
  if (!(Test-Path $NUGET_EXE)) {
    Write-Verbose -Message "Downloading NuGet.exe..."
    try {
      $wc = GetProxyEnabledWebClient
      $wc.DownloadFile($NUGET_URL, $NUGET_EXE)
    }
    catch {
      Throw "Could not download NuGet.exe."
    }
  }
}

function EnsureNugetConfigSource($sourceName, $sourceValue) {
  EnsureNugetExe

  Write-Host "Adding/editing the '$sourceName' NuGet source with '$SitecoreNugetSource'..."

  if ($NUGET_CREDENTIALS_PROVIDED) {
    & "$NUGET_EXE" sources add -name "$sourceName" -source "$sourceValue" -ConfigFile $NUGET_CONFIG -username $NugetUser -password $NugetPassword -StorePasswordInClearText | Out-Null
    & "$NUGET_EXE" sources update -name "$sourceName" -source "$sourceValue" -ConfigFile $NUGET_CONFIG -username $NugetUser -password $NugetPassword -StorePasswordInClearText
  } else {
    & "$NUGET_EXE" sources add -name "$sourceName" -source "$sourceValue" -ConfigFile $NUGET_CONFIG | Out-Null
    & "$NUGET_EXE" sources update -name "$sourceName" -source "$sourceValue" -ConfigFile $NUGET_CONFIG
  }
}

if ([string]::IsNullOrEmpty($Sitecore2NugetSource)) {
  # if it wasn't passed as a parameter, let's try to find it in environment
  $Sitecore2NugetSource = $env:INTERNAL_SITECORE2_NUGET_SOURCE
}
if ($false -eq [string]::IsNullOrEmpty($Sitecore2NugetSource)) {
  EnsureNugetConfigSource -sourceName "Sitecore2" -sourceValue $Sitecore2NugetSource
}

if ([string]::IsNullOrEmpty($SitecoreGalleryNugetSource)) {
  # if it wasn't passed as a parameter, let's try to find it in environment
  $SitecoreGalleryNugetSource = $env:INTERNAL_SITECOREGALLERY_NUGET_SOURCE
}
if ($false -eq [string]::IsNullOrEmpty($SitecoreGalleryNugetSource)) {
  EnsureNugetConfigSource -sourceName "SitecoreGallery" -sourceValue $SitecoreGalleryNugetSource
}

Write-Host "Done!" -ForegroundColor Green
