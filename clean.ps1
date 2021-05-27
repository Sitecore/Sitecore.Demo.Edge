Get-ChildItem -Path (Join-Path $PSScriptRoot "\docker\data") -Directory | ForEach-Object {
    $dataPath = $_.FullName

    Get-ChildItem -Path $dataPath -Exclude ".gitkeep" -Recurse | Remove-Item -Force -Recurse -Verbose
}

Get-ChildItem -Path (Join-Path $PSScriptRoot "\Website\deploy") -Directory | ForEach-Object {
    $deployPath = $_.FullName

    Get-ChildItem -Path $deployPath -Exclude ".gitkeep" -Recurse | Remove-Item -Force -Recurse -Verbose
}

Get-ChildItem -Path (Join-Path $PSScriptRoot "\Website\deploy") -Exclude ".gitkeep" | Remove-Item -Force -Verbose