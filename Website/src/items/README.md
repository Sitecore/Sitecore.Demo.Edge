# Serialized Sitecore Items

This path contains serialized Sitecore content items for this demo. The
serialized paths are configured in `*.module.json` files in the parent directory.

* `InitItems.module.json` configures items which this template needs to
  push before deploying JSS items using `jss deploy` (command that is not used
  in this demo that is developed using Sitecore-first).
* `EdgeWebsite.module.json` contains developer-owned configuration items
  which are created by the JSS website.
* `EdgeWebsite-Content.module.json` contains content items which are
  created by the JSS website. It's a good practice to put content
  into a separate module, so it can be excluded from packaging and deployment.

See Sitecore Content Serialization documentation for more information.
