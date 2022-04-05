# Overview

This command line interface allows you to take a Sitecore Discover product & category feed and use it to generate a set of associated products and categories in an OrderCloud marketplace.

The main goal is to give Sitecore partners the ability to quickly play with both set of APIs. Sitecore Discover does not currently support self-service creation of new instances. To work around that limitation, our plan is to grant partners access to a _shared_ Sitecore Discover instance which they can then use to seed their own OrderCloud instance. Long term, we want to be able to allow any developer to be able to create their own Sitecore Discover instance.

## Known limitations

This tool is only meant to generate B2C scenarios. Sitecore Discover does have some support for B2B use cases but we have not fleshed out what that would look like yet (that is next on our roadmap).

## Requirements

- [Node](https://nodejs.org/en/) >= 12

## Usage

```shell
Usage: importfeed [options]

A tool to import a Sitecore Discover feed into OrderCloud

Options:
  -v, --version                              output the version number
  -u, --username <string>                    username for portal credentials https://ordercloud.io/
  -p, --password <string>                    password for portal credentials https://ordercloud.io/
  -m, --marketplaceID <string>               ID for the OrderCloud marketplace where products should be loaded into
  -t, --template <type>                      (Optional) an existing template feed (choices: "playsummit", default: "playsummit")
  -f, --productFilePath <path>               (Optional) filepath to a Sitecore Discover product feed, should adhere to Sitecore Discover standard
  -c, --categoryFilePath <path>              (Optional) filepath to a Sitecore Discover category feed, should adhere to Sitecore Discover standard
  -b, --buyerID <string>                     (Optional) ID of an EXISTING buyer
  -x, --catalogID <string>                   (Optional) ID of an EXISTING catalog
  -e, --environment <ordercloudenvironment>  (choices: "sandbox", "staging", "production", default: "sandbox")
  -h, --help                                 display help
```

### Examples

The shortest possible syntax

```shell
importfeed -u myusername -p mypassword -m mymarketplaceid
```

This will import products and categories from the playsummit template into your ordercloud marketplace

Using an existing catalog and buyer

```shell
importfeed -u myusername -p mypassword -m mymarketplaceid -b mybuyerid -x mycatalogid
```

This will load products and categories into the provided catalog and make those products & categories visible to the provided buyer

Using your own Sitecore Discover feed files

```shell
importfeed -u myusername -p mypassword -m mymarketplaceid -f path/to/my/product-feed.csv -c path/to/mycategory-feed.csv
```

Instead of using the templates stored in our application, you can provide your own Sitecore Discover feeds but they should match the format of the existing feeds used in the templates.
