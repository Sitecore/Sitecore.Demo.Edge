Write-Host "Down containers..." -ForegroundColor Green
try {
  # DEMO TEAM CUSTOMIZATION - Kill Linux mssql container to speed up down
  docker-compose kill mssql
  docker-compose down
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Container down failed, see errors above."
  }
}
finally {
}
