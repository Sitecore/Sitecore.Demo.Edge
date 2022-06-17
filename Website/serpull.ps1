.\docker\ensure-running-containers.ps1

Write-Host "Pulling serialized items..." -ForegroundColor Green
dotnet sitecore ser pull
