Write-Host "Down containers..." -ForegroundColor Green
try {
  docker compose kill mssql
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Container down failed, see errors above."
  }

  docker compose kill headstart-storage
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Container down failed, see errors above."
  }

  docker compose down
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Container down failed, see errors above."
  }
}
finally {
}
