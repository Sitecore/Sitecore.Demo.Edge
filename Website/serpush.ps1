.\docker\ensure-running-containers.ps1

Write-Host "Pushing serialized items..." -ForegroundColor Green
dotnet sitecore ser push
