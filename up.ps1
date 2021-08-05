$ErrorActionPreference = "Stop";

# Double check whether init has been run
$envCheckVariable = "HOST_LICENSE_FOLDER"
$envCheck = Get-Content .env -Encoding UTF8 | Where-Object { $_ -imatch "^$envCheckVariable=.+" }
if (-not $envCheck) {
    if (Test-Path "C:\License"){
        Write-Host "Initializing environment using default values" -ForegroundColor Yellow
        & .\init.ps1 -InitEnv -AdminPassword b -LicenseXmlPath C:\License\license.xml
        & .\init-ci.ps1
    }
    else {
        throw "$envCheckVariable does not have a value. Did you run 'init.ps1 -InitEnv'?"
    }
}

# Build all containers in the Sitecore instance, forcing a pull of latest base containers
Write-Host "Building containers..." -ForegroundColor Green
docker-compose build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Container build failed, see errors above."
}

# DEMO TEAM CUSTOMIZATION - Install npm modules before starting the development rendering container.
# Install npm modules in rendering folder
Push-Location .\Website\src\rendering
npm install
Pop-Location

# Start the Sitecore instance
Write-Host "Starting Sitecore environment..." -ForegroundColor Green
docker-compose up -d

# Wait for Traefik to expose CM route
Write-Host "Waiting for CM to become available..." -ForegroundColor Green
$startTime = Get-Date
do {
    Start-Sleep -Milliseconds 100
    try {
        $status = Invoke-RestMethod "http://localhost:8079/api/http/routers/cm-secure@docker"
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -ne "404") {
            throw
        }
    }
} while ($status.status -ne "enabled" -and $startTime.AddSeconds(15) -gt (Get-Date))
if (-not $status.status -eq "enabled") {
    $status
    Write-Error "Timeout waiting for Sitecore CM to become available via Traefik proxy. Check CM container logs."
}

# DEMO TEAM CUSTOMIZATION - Non-interactive CLI login
$clientSecretVariable = "ID_SERVER_DEMO_CLIENT_SECRET"
$clientSecret = Get-Content .env -Encoding UTF8 | Where-Object { $_ -imatch "^$clientSecretVariable=.+" } 
$clientSecret = $clientSecret.Split("=")[1]

# DEMO TEAM CUSTOMIZATION - Moved the Docker files up one level. Must run the Sitecore CLI commands in the .\Website folder.
Push-Location .\Website

try {
    dotnet sitecore login --cm https://cm.edge.localhost/ --auth https://id.edge.localhost/ --allow-write true
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Unable to log into Sitecore, did the Sitecore environment start correctly? See logs above."
    }

    # Populate Solr managed schemas to avoid errors during item deploy
    Write-Host "Populating Solr managed schema..." -ForegroundColor Green
    $token = (Get-Content .\.sitecore\user.json | ConvertFrom-Json).endpoints.default.accessToken
    Invoke-RestMethod "https://cm.edge.localhost/sitecore/admin/PopulateManagedSchema.aspx?indexes=all" -Headers @{Authorization = "Bearer $token"} -UseBasicParsing | Out-Null

    # DEMO TEAM CUSTOMIZATION - Removed initial JSS app items deployment and serialization. We are developing in Sitecore-first mode.
    # Push the serialized items
    Write-Host "Pushing items to Sitecore..." -ForegroundColor Green
    dotnet sitecore ser push --publish
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Serialization push failed, see errors above."
    }
} catch {
    Write-Error "An error occurred while attempting to log into Sitecore, populate the Solr managed schema, or pushing website items to Sitecore: $_"
} finally {
    Pop-Location
}

Write-Host "Opening site..." -ForegroundColor Green

Start-Process https://cm.edge.localhost/sitecore/
Start-Process https://www.edge.localhost/

Write-Host ""
Write-Host "Use the following command to monitor your Rendering Host:" -ForegroundColor Green
Write-Host "docker-compose logs -f rendering"
Write-Host ""
