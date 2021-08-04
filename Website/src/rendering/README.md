# Sitecore JSS Next.js Starter Application

Consult the primary JSS documentation at <https://jss.sitecore.net> for the latest documentation on JSS.

## Quick Start

1. Make sure there are no pending changes and untracked files ("git clean -xdf" to remove untracked)

2. Run PowerShell console in Administrator mode and navigate to the project folder

3. Run .\up.ps1 and login to Sitecore using superuser/b credentials when propmpted

## Storybook

The project uses [Storybook](https://github.com/storybookjs/storybook) for "disconnected" development. Standard "disconnected" mode has been removed, "npm run start" runs connected and expects Sitecore to be running.

To browse the existing stories - run "npm run storybook".

To add a new story - create a *.stories.tsx file under src\stories, use other files in that folder as an example.

If adding a component story - the title should be: 'Components/%Component Name Here%', for pages it is 'Pages/%Page Name Here%'
