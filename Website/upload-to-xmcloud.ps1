[CmdletBinding(DefaultParameterSetName = "no-arguments")]
Param (
    [Parameter(Mandatory = $true,
        HelpMessage = "The XM Cloud environment ID in which to create the deployment.")]
    [string]$EnvironmentId
)

$ErrorActionPreference = "Stop";

Write-Host "Switching to XM Cloud deployment .gitignore file..." -ForegroundColor Green
Copy-Item -Path .\.gitignore -Destination .\.gitignore.default
Get-Content .\.gitignore, .\.gitignore.deploy | Set-Content .\.gitignore.merged
Remove-Item -Path .\.gitignore
Rename-Item -Path .\.gitignore.merged -NewName .\.gitignore

try {
    Write-Host "Uploading site to XM Cloud... (It can take some time to start)" -ForegroundColor Green
    dotnet sitecore cloud deployment create --environment-id $EnvironmentId --upload
} finally {
    Write-Host "Switching back to regular .gitignore file..." -ForegroundColor Green
    Remove-Item -Path .\.gitignore
    Rename-Item -Path .\.gitignore.default -NewName .\.gitignore
    Write-Host "Done" -ForegroundColor Green
}
