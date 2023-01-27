# Upgrading

## Website JSS project

1. Create an empty JSS Next.js app using the target JSS version. E.g.: `npx create-sitecore-jss@20.0.3 --templates nextjs,nextjs-sxa --appName jss-upgrade-target-nextjs-sxa --fetchWith GraphQL --prerender SSG`
   1. Replace `20.0.3` by the target version you want to upgrade to.
2. Using a folder compare tool, compare the new empty sample app with the PLAY! Summit website app (`\Website\src\rendering`).
3. Merge JSS sample changes into the PLAY! Summit website app.
   1. Make sure to keep the DEMO TEAM CUSTOMIZATIONS comments when necessary and remove those that are already covered by the new sample.
