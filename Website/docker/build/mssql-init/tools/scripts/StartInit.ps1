[CmdletBinding()]
param (
    [Parameter(Mandatory)]
    [ValidateScript({ Test-Path $_ -PathType Container })]
    [string]$ResourcesDirectory,

    [Parameter(Mandatory)]
    [string]$SqlServer,

    [Parameter(Mandatory)]
    [string]$SqlAdminUser,

    [Parameter(Mandatory)]
    [string]$SqlAdminPassword,

    [Parameter(Mandatory)]
    [string]$SitecoreAdminPassword,

    [string]$SqlElasticPoolName,
    [object[]]$DatabaseUsers,

    [string]$DatabasesToDeploy,

    [int]$PostDeploymentWaitPeriod
)

$deployDatabases = $true

if (-not $DatabasesToDeploy) {
    $serverDatabasesQuery = "SET NOCOUNT ON; SELECT name FROM sys.databases"
    $serverDatabases = Invoke-Expression "sqlcmd -S $SqlServer -U $SqlAdminUser -P $SqlAdminPassword -Q '$serverDatabasesQuery' -h -1 -W"

    $existingDatabases = Get-ChildItem $ResourcesDirectory -Filter *.dacpac -Recurse -Depth 1 | `
                            Where-Object { $serverDatabases.Contains($_.BaseName)}
    if ($existingDatabases.Count -gt 0) {
        Write-Information -MessageData "Sitecore databases are detected. Skipping deployment." -InformationAction Continue
        $deployDatabases = $false
    }
}

if ($deployDatabases) {
    .\DeployDatabases.ps1 -ResourcesDirectory $ResourcesDirectory -SqlServer:$SqlServer -SqlAdminUser:$SqlAdminUser -SqlAdminPassword:$SqlAdminPassword -EnableContainedDatabaseAuth -SkipStartingServer -SqlElasticPoolName $SqlElasticPoolName -DatabasesToDeploy $DatabasesToDeploy

    if(-not $DatabasesToDeploy) {
        if(Test-Path -Path (Join-Path $ResourcesDirectory "smm_azure.sql")) {
            .\InstallShards.ps1 -ResourcesDirectory $ResourcesDirectory -SqlElasticPoolName $SqlElasticPoolName -SqlServer $SqlServer -SqlAdminUser $SqlAdminUser -SqlAdminPassword $SqlAdminPassword
        }

        .\SetDatabaseUsers.ps1 -ResourcesDirectory $ResourcesDirectory -SqlServer:$SqlServer -SqlAdminUser:$SqlAdminUser -SqlAdminPassword:$SqlAdminPassword `
            -DatabaseUsers $DatabaseUsers
        .\SetSitecoreAdminPassword.ps1 -ResourcesDirectory $ResourcesDirectory -SitecoreAdminPassword $SitecoreAdminPassword -SqlServer $SqlServer -SqlAdminUser $SqlAdminUser -SqlAdminPassword $SqlAdminPassword
    }

    Write-Host "Installing Content Hub Connector assets"
    .\DeployDatabases.ps1 -ResourcesDirectory C:\ch_data -SqlServer:$SqlServer -SqlAdminUser:$SqlAdminUser -SqlAdminPassword:$SqlAdminPassword -EnableContainedDatabaseAuth -SkipStartingServer -SqlElasticPoolName $SqlElasticPoolName -DatabasesToDeploy $DatabasesToDeploy

}

$ready = Invoke-Sqlcmd -ServerInstance $SqlServer -Username $SqlAdminUser -Password $SqlAdminPassword -Query "select name from sys.databases where name = 'platform_init_ready'"
if (-not $ready) {

    # Create platform_init_ready database to indicate that init script is complete
    Invoke-Sqlcmd -ServerInstance $SqlServer -Username $SqlAdminUser -Password $SqlAdminPassword -Query "create database platform_init_ready" -Verbose
}

[System.Environment]::SetEnvironmentVariable("DatabasesDeploymentStatus", "Complete", "Machine")

Write-Host "Sleeping for 300 seconds to allow depends_on to proceed"

Start-Sleep -Seconds 300