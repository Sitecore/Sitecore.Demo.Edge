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
    [string]$SitecoreAdminUsername,

    [Parameter(Mandatory)]
    [string]$SitecoreAdminPassword,

    [Parameter(Mandatory)]
    [string]$SitecoreUserPassword,

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

    Write-Host "Installing SPE assets"
    .\DeployDatabases.ps1 -ResourcesDirectory C:\spe_data -SqlServer:$SqlServer -SqlAdminUser:$SqlAdminUser -SqlAdminPassword:$SqlAdminPassword -EnableContainedDatabaseAuth -SkipStartingServer -SqlElasticPoolName $SqlElasticPoolName -DatabasesToDeploy $DatabasesToDeploy

    Write-Host "Installing Content Hub Connector assets"
    .\DeployDatabases.ps1 -ResourcesDirectory C:\ch_data -SqlServer:$SqlServer -SqlAdminUser:$SqlAdminUser -SqlAdminPassword:$SqlAdminPassword -EnableContainedDatabaseAuth -SkipStartingServer -SqlElasticPoolName $SqlElasticPoolName -DatabasesToDeploy $DatabasesToDeploy

    Write-Host "Installing JSS assets"
    .\DeployDatabases.ps1 -ResourcesDirectory C:\jss_data -SqlServer:$SqlServer -SqlAdminUser:$SqlAdminUser -SqlAdminPassword:$SqlAdminPassword -EnableContainedDatabaseAuth -SkipStartingServer -SqlElasticPoolName $SqlElasticPoolName -DatabasesToDeploy $DatabasesToDeploy

}

$ready = Invoke-Sqlcmd -ServerInstance $SqlServer -Username $SqlAdminUser -Password $SqlAdminPassword -Query "select name from sys.databases where name = 'platform_init_ready'"
if (-not $ready) {

    # Disable sitecore\admin
    Invoke-Sqlcmd -ServerInstance $SqlServer -Username $SqlAdminUser -Password $SqlAdminPassword -InputFile "C:\sql\DisableSitecoreAdminUser.sql" -Verbose

    # Create custom admin user
	.\CreateSitecoreAdminUser.ps1 -SqlServer $SqlServer -SqlAdminUser $SqlAdminUser -SqlAdminPassword $SqlAdminPassword -SitecoreAdminUsername $SitecoreAdminUsername -SitecoreAdminPassword $SitecoreAdminPassword

    # Create Minnie user and placeholder role
    .\CreateSitecoreAuthorUser.ps1 -SqlServer $SqlServer -SqlAdminUser $SqlAdminUser -SqlAdminPassword $SqlAdminPassword -SitecoreAuthorUsername "sitecore\Minnie" -SitecoreAuthorPassword $SitecoreUserPassword -SitecoreAuthorRolename "sitecore\Demo Content Creator" -SitecoreAuthorProfilePropertyNames 'Portrait:S:0:24:FullName:S:24:6:ProfileItemId:S:30:38:SerializedData:B:0:2354:' -SitecoreAuthorProfilePropertyValueString 'office/16x16/woman_4.pngMinnie{AE4C4969-5B7E-4B4E-9042-B2D8701CE214}'
    
    # Create Pete user and placeholder role
	.\CreateSitecoreAuthorUser.ps1 -SqlServer $SqlServer -SqlAdminUser $SqlAdminUser -SqlAdminPassword $SqlAdminPassword -SitecoreAuthorUsername "sitecore\Pete" -SitecoreAuthorPassword $SitecoreUserPassword -SitecoreAuthorRolename "sitecore\Demo Content Approver" -SitecoreAuthorProfilePropertyNames 'Portrait:S:0:22:FullName:S:22:4:ProfileItemId:S:26:38:SerializedData:B:0:1502:' -SitecoreAuthorProfilePropertyValueString 'office/16x16/man_5.pngPete{AE4C4969-5B7E-4B4E-9042-B2D8701CE214}'

    # Create platform_init_ready database to indicate that init script is complete
    Invoke-Sqlcmd -ServerInstance $SqlServer -Username $SqlAdminUser -Password $SqlAdminPassword -Query "create database platform_init_ready" -Verbose
}

[System.Environment]::SetEnvironmentVariable("DatabasesDeploymentStatus", "Complete", "Machine")

Write-Host "Sleeping for 300 seconds to allow depends_on to proceed"

Start-Sleep -Seconds 300