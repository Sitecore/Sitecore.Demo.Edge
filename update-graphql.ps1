.\docker\ensure-running-containers.ps1

Write-Host "Updating GraphQL introspection data..." -ForegroundColor Green
Push-Location .\Website\src\rendering
npm run graphql:update
Pop-Location
