Param(
  [string]$target,
  [string]$output
)

Write-Host "Installing Module"
Install-Module -Name Sitecore.Courier -Repository PSGallery -Force -Confirm:$False  -RequiredVersion 1.4.3

Write-Host "Importing Module"
Import-Module Sitecore.Courier -Force -Verbose

Write-Host "Creating Update Packages"
New-CourierPackage -Target $target -Output "$output/data" -SerializationProvider "Rainbow" -IncludeFiles $false -EnsureRevision $true -DacPac $true

Write-Host "Created Update Package" -ForegroundColor Green

Remove-Item -Verbose -Path "$output/data/.sql"
Rename-Item  -Verbose -Path "$output/data/.dacpac" -NewName "Sitecore.Master.dacpac"