USE [Sitecore.Core]

declare @UserName_ nvarchar(256) = $(UserName)
declare @RoleName_ nvarchar(256) = $(RoleName)
declare @EMail_ nvarchar(256) = $(EMail)
declare @EncodedPassword_ nvarchar(128) = $(EncodedPassword)
declare @EncodedSalt_ nvarchar(128) = $(EncodedSalt)
declare @ProfilePropertyNames_ nvarchar(256) = $(ProfilePropertyNames)
declare @ProfilePropertyValueString_ nvarchar(256) = $(ProfilePropertyValueString)

DECLARE @now datetime = GETDATE()
exec aspnet_Membership_CreateUser 'sitecore', @UserName_, @EncodedPassword_, @EncodedSalt_, @EMail_,'','', 1, @now, @now, 0, 0,null

DECLARE @UserId nvarchar(256)
SELECT TOP 1
  @UserId = [UserId]
FROM [aspnet_Users]
WHERE [UserName] = @UserName_

INSERT [dbo].[aspnet_Profile]
  ([UserId], [PropertyNames], [PropertyValuesString], [PropertyValuesBinary], [LastUpdatedDate])
VALUES
  (@UserId,
    @ProfilePropertyNames_,
    @ProfilePropertyValueString_,
    0x46616C7365,
    CAST(0x0000A2F500D2B376 AS DateTime))

UPDATE [dbo].[aspnet_Membership]
SET [PasswordFormat] = 1
WHERE [UserId] = @UserID

EXEC aspnet_Roles_CreateRole 'sitecore', @RoleName_

EXEC aspnet_UsersInRoles_AddUsersToRoles 'sitecore', @UserName_, @RoleName_, 8