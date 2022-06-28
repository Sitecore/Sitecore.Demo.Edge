# Upgrading

## Website JSS project

1. Install the target JSS CLI. E.g.: `npm install -g @sitecore-jss/sitecore-jss-cli@19.0.0-canary.63`
2. Create an empty JSS Next.js app using the target JSS version. E.g.: `jss create jss-nineteen-empty nextjs --branch release/19.0.0 --fetchWith GraphQL --prerender SSG --empty true`
3. Using a folder compare tool, compare the new empty sample app with the PLAY! Summit website app (`\Website\src\rendering`).
4. Merge JSS sample changes into the PLAY! Summit website app.
   1. Make sure to keep the DEMO TEAM CUSTOMIZATIONS when necessary and remove those that are already covered by the new sample.