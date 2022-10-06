.\docker\ensure-running-containers.ps1

Write-Host "Updating GraphQL introspection data..." -ForegroundColor Green
# DEMO TEAM CUSTOMIZATION - Moved the Docker files up one level. Must run the Sitecore CLI commands in the .\Website folder.
Push-Location .\Website\src\rendering
npm run graphql:update
Pop-Location
