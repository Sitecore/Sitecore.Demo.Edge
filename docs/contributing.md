# Contributing

Contributions are always welcome by submitting [pull requests](https://github.com/Sitecore/Sitecore.Demo.Edge/pulls) on GitHub!

## Before Submitting a Pull Request

Before submitting a pull request, we must make sure that:

- All modified items are serialized.
- The GraphQL introspection data is updated if there were changes to templates or fields.
- Changes made to specific files are synced to all files with the same name across the projects.

This can be done by:

1. Ensuring the containers are running.
1. Running the script:

   ```text
   .\pre-pr-updates.ps1
   ```

1. Review console messages.
1. Sync any out-of-sync files.
1. Review any Git pending changes.
1. Commit valid Git pending changes to your branch.
1. Submit your pull request.

## Submitting a Pull Request

### Target Branch

Pull requests must use the `develop` branch as the target branch.

### Title

Please provide a complete title that explains what is the PR adding, fixing, or removing. This title will be used as the squash merge commit message.
