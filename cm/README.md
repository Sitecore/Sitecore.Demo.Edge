# Git Sync

## The files from this folder will be copied to the website root folder automatically

Git Sync is a one-way (from your Git repository -> to your instance) continuous (on startup, and then checked once a minute) file system synchronization. It can be enabled by setting **GIT_SYNC_REPO** environment variable.

It will monitor file changes in a repository (default branch) and automatically copy them into website root folder (C:\inetpub\wwwroot).

For example, README.md will be copied into C:\inetpub\wwwroot\README.md,  any existing files will be overwritten.

Changes to system files or directories might cause Sitecore restart! Removing files is not supported and the workaround is to Stop/Wait 5 mins/Start the instance (this will apply the files from scratch).
