$JobParameters = @{
    Path               = 'c:\repository'
    Destination        = 'c:\inetpub\wwwroot'
    ExcludeDirectories = @('poststeps')
    ExcludeFiles       = @('DeviceDetectionDB*')
}

$JobName = "Git-Sync.ps1"

Write-Host "$(Get-Date -Format $timeFormat): ENTRYPOINT: '$JobName' starting..."

Start-Job -Name $JobName -ArgumentList $JobParameters -ScriptBlock {
    param([hashtable]$params)

    & "C:\tools\scripts\Git-Sync.ps1" @params

}

# Test
& "C:\tools\scripts\Git-Sync.ps1" @JobParameters

#& "C:\LogMonitor\LogMonitor.exe" "powershell" "C:\Run-W3SVCService.ps1" 
