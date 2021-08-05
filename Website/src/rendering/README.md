# Sitecore JSS Next.js Website Application

Consult the primary JSS documentation at <https://jss.sitecore.net> for the latest documentation on JSS.

## Prerequisites

See prerequisites in the `/Website/README.md` file.

## Storybook

The project uses [Storybook](https://github.com/storybookjs/storybook) for "disconnected" development. Standard JSS "disconnected" mode has been removed. `jss start` now runs connected and expects Sitecore to be running.

To browse the existing stories - run `jss storybook`

To add a new story, create a `*.stories.tsx` file under `src\stories`. Use other files in that folder as an example.

If adding a component story, the title should be: `'Components/%Component Name Here%'`. For pages, it is `'Pages/%Page Name Here%'`.
