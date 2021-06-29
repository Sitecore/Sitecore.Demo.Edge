Param(
  [Parameter(Mandatory)]
  [string]$SqlServer,

  [Parameter(Mandatory)]
  [string]$SqlAdminUser,

  [Parameter(Mandatory)]
  [string]$SqlAdminPassword,

  [Parameter(Mandatory)]
  [string] $SitecoreAdminUser,

  [Parameter(Mandatory)]
  [string] $SitecoreAdminPassword
)

$userinfoAdmin = .\HashPassword.ps1 $SitecoreAdminPassword
$passwordParamAdmin = ("EncodedPassword='" + $userinfoAdmin.Password + "'")
$saltParamAdmin = ("EncodedSalt='" + $userinfoAdmin.Salt + "'")
$UserNameParamAdmin = ("UserName='" + $SitecoreAdminUser + "'")
$EMailParamAdmin = ("EMail='noreply@sitecoredemo.com'")
$paramsAdmin = $passwordParamAdmin, $saltParamAdmin, $UserNameParamAdmin, $EMailParamAdmin

Invoke-Sqlcmd -ServerInstance $SqlServer -Username $SqlAdminUser -Password $SqlAdminPassword -InputFile "C:\sql\CreateSitecoreAdminUser.sql" -Variable $paramsAdmin
Write-Host "$(Get-Date -Format $timeFormat): Invoke CreateSitecoreAdminUser.sql for $SitecoreAdminUser"