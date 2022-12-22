Get-ChildItem -Path (Join-Path $PSScriptRoot "\data") -Directory | ForEach-Object {
    $dataPath = $_.FullName

    Get-ChildItem -Path $dataPath -Exclude ".gitkeep" -Recurse | Remove-Item -Force -Recurse -Verbose
}

# DEMO TEAM CUSTOMIZATION - Moved the deploy folder inside the Website folder.
Get-ChildItem -Path (Join-Path $PSScriptRoot "..\Website\deploy") -Directory | ForEach-Object {
    $deployPath = $_.FullName

    Get-ChildItem -Path $deployPath -Exclude ".gitkeep" -Recurse | Remove-Item -Force -Recurse -Verbose
}

# DEMO TEAM CUSTOMIZATION - Also delete files at the root of the deploy folder.
Get-ChildItem -Path (Join-Path $PSScriptRoot "..\Website\deploy") -Exclude ".gitkeep" | Remove-Item -Force -Verbose