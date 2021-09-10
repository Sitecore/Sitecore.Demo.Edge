.\docker\ensure-running-containers.ps1

Write-Host "Pushing serialized items..." -ForegroundColor Green
Push-Location .\Website
dotnet sitecore ser push
Pop-Location
