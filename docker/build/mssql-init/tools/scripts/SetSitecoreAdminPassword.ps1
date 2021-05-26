[CmdletBinding()]
param (
    [Parameter(Mandatory)]
    [ValidateScript({ Test-Path $_ -PathType Container })]
    [string]$ResourcesDirectory,

    [Parameter(Mandatory)]
    [string]$SitecoreAdminPassword,

    [Parameter(Mandatory)]
    [string]$SqlServer,

    [string]$SqlAdminUser,

    [string]$SqlAdminPassword
)

(Get-Content (Join-Path $ResourcesDirectory "SetSitecoreAdminPassword.sql")) -replace "PlaceHolderForPassword", "$($SitecoreAdminPassword)" | Set-Content (Join-Path $ResourcesDirectory "SetSitecoreAdminPassword.sql")

if($SqlAdminUser -and $SqlAdminPassword) {
    & sqlcmd -I -i (Join-Path $ResourcesDirectory 'SetSitecoreAdminPassword.sql') -d 'Sitecore.Core' -S "$SqlServer" -U "$SqlAdminUser" -P "$SqlAdminPassword"
} else {
    & sqlcmd -I -i (Join-Path $ResourcesDirectory 'SetSitecoreAdminPassword.sql') -d 'Sitecore.Core' -S "$SqlServer"
}

if($LASTEXITCODE -ne 0) {
    throw "sqlcmd exited with code $LASTEXITCODE while setting Sitecore admin password"
}

Write-Host "Set Sitecore admin password"