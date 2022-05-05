.\docker\ensure-running-containers.ps1

Write-Host "Pulling serialized items..." -ForegroundColor Green
Push-Location .\Website
dotnet sitecore ser pull
Pop-Location
