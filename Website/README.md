# Website

Main PLAY! Summit website.

## What's Included

* Sitecore Content Serialization configuration.
* An MSBuild project for deploying configuration and code into the Sitecore Content Management role. (see `src\platform`).
* A Sitecore JSS Next.js project (see `src\rendering`).

## Prerequisites

* Sitecore JSS CLI 18.0.0-canary.1
  * Install it globally using `npm install -g @sitecore-jss/sitecore-jss-cli@18.0.0-canary.1`

## Configured for Sitecore-based workflow

It is intended that you work directly in Sitecore to define templates and renderings, instead of using the code-first approach. This is also known as "Sitecore-first" JSS workflow. To support this:

* The JSS content workflow is disabled
* Imported items will not be marked as 'protected'
* JSS import warnings in the Content Editor and Experience Editor have been disabled

## Using the Solution

* A Visual Studio / MSBuild publish of the `Platform` project will update the running `cm` service.
* The running `rendering` service uses `next dev` against the mounted Next.js application, and will recompile automatically for any changes you make.
* You can also run the Next.js application directly using `npm` commands within `src\rendering`.
* Debugging of the Next.js application is possible by using the `start:connected` or `start` scripts from the Next.js `package.json`, and the pre-configured *Attach to Process* VS Code launch configuration.
* Review README's found in the projects and throughout the solution for additional information.
