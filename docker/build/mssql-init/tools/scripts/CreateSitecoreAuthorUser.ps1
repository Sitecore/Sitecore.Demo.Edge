Param(
  [Parameter(Mandatory)]
  [string]$SqlServer,

  [Parameter(Mandatory)]
  [string]$SqlAdminUser,

  [Parameter(Mandatory)]
  [string]$SqlAdminPassword,

  [Parameter(Mandatory)]
  [string] $SitecoreAuthorUsername,

  [Parameter(Mandatory)]
  [string] $SitecoreAuthorPassword,

  [Parameter(Mandatory)]
  [string] $SitecoreAuthorRolename,

  [Parameter(Mandatory)]
  [string] $SitecoreAuthorProfilePropertyNames,

  [Parameter(Mandatory)]
  [string] $SitecoreAuthorProfilePropertyValueString
)

$userinfoAdmin = .\HashPassword.ps1 $SitecoreAuthorPassword
$passwordParamAdmin = ("EncodedPassword='" + $userinfoAdmin.Password + "'")
$saltParamAdmin = ("EncodedSalt='" + $userinfoAdmin.Salt + "'")
$UserNameParamAdmin = ("UserName='" + $SitecoreAuthorUsername + "'")
$EMailParamAdmin = ("EMail='minnie@sitecoredemo.com'")
$RoleNameParamAdmin = ("RoleName='" + $SitecoreAuthorRolename + "'")
$ProfilePropertyNames = ("ProfilePropertyNames='" + $SitecoreAuthorProfilePropertyNames + "'")
$ProfilePropertyValueString = ("ProfilePropertyValueString='" + $SitecoreAuthorProfilePropertyValueString + "'")
$paramsAdmin = $passwordParamAdmin, $saltParamAdmin, $UserNameParamAdmin, $EMailParamAdmin, $RoleNameParamAdmin, $ProfilePropertyNames, $ProfilePropertyValueString

Invoke-Sqlcmd -ServerInstance $SqlServer -Username $SqlAdminUser -Password $SqlAdminPassword -InputFile "C:\sql\CreateSitecoreAuthorUser.sql" -Variable $paramsAdmin -TrustServerCertificate
Write-Host "$(Get-Date -Format $timeFormat): Invoke CreateSitecoreAuthorUser.sql for $SitecoreAuthorUsername"