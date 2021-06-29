# Website

## About this Solution
This solution is designed to help developers learn and get started quickly
with Sitecore Containers, the Sitecore Next.js SDK, and Sitecore
Content Serialization.

For simplicity, this solution does not implement Sitecore Helix conventions for
solution architecture. As you begin building your Sitecore solution,
you should review [Sitecore Helix](https://helix.sitecore.net/) and the
[Sitecore Helix Examples](https://sitecore.github.io/Helix.Examples/) for guidance
on implementing a modular solution architecture.

## Configured for Sitecore-based workflow
On first run, the JSS website will be imported via `jss deploy items`, then serialized via `sitecore ser pull`. It is intended that you work directly in Sitecore to define templates and renderings, instead of using the code-first approach. This is also known as "Sitecore-first" JSS workflow. To support this:

* The JSS content workflow is disabled
* Imported items will not be marked as 'protected'
* JSS import warnings in the Content Editor and Experience Editor have been disabled

The code-first Sitecore definitions and routes remain in the JSS project, in case you wish to use them for local development / mocking. You can remove these from `/data` and `/sitecore` if desired. You may also wish to remove the [initial import logic in the `up.ps1` script](./up.ps1#L44).


## Support
The template output as provided is supported by Sitecore. Once changed or amended,
the solution becomes a custom implementation and is subject to limitations as
defined in Sitecore's [scope of support](https://kb.sitecore.net/articles/463549#ScopeOfSupport).

## Prerequisites
* NodeJs 14.x
* .NET Core 3.1 SDK
* .NET Framework 4.8 SDK
* Visual Studio 2019
* Docker for Windows, with Windows Containers enabled

See Sitecore Containers documentation for more information on system requirements.

## What's Included
* A `docker-compose` environment for a Sitecore XM1 topology
  with a Next.js rendering host.

  > The included `docker-compose.yml` is a stock XM1 environment from the Sitecore
  > Container Support Package. All changes/additions for this solution are included
  > in the `docker-compose.override.yml`.

* Scripted invocation of `jss create` and `jss deploy` to initialize a
  Next.js application.
* Sitecore Content Serialization configuration.
* An MSBuild project for deploying configuration and code into
  the Sitecore Content Management role. (see `src\platform`).

## Using the Solution
* A Visual Studio / MSBuild publish of the `Platform` project will update the running `cm` service.
* The running `rendering` service uses `next dev` against the mounted Next.js application, and will recompile automatically for any changes you make.
* You can also run the Next.js application directly using `npm` commands within `src\rendering`.
* Debugging of the Next.js application is possible by using the `start:connected` or `start` scripts from the Next.js `package.json`, and the pre-configured *Attach to Process* VS Code launch configuration.
* Review README's found in the projects and throughout the solution for additional information.