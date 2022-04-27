import { SeedOptions } from './models/SeedOptions';
import portalService from './services/portal-service';
import * as OrderCloudSDK from 'ordercloud-javascript-sdk';
import * as helpers from './helpers';

import path from 'path';
import { csvToJson } from './helpers/csvToJson';
import chalk from 'chalk';
import { Buyer, Catalog, Variant } from 'ordercloud-javascript-sdk';

let results = {
  categories: {
    processed: 0,
    total: 0,
    errors: 0,
  },
  categoryAssignments: {
    processed: 0,
    total: 0,
    errors: 0,
  },
  products: {
    processed: 0,
    total: 0,
    errors: 0,
  },
};

async function run(options: SeedOptions) {
  await portalService.login(
    options.username,
    options.password,
    options.marketplaceID,
    options.environment
  );

  let productFeed;
  let categoryFeed;
  const projectRoot = path.join(__dirname, '../', '../');
  const templatesFolder = path.join(projectRoot, '../../../Website/src/discover-feeds/');

  // get product data from provided file or template
  if (options.productFilePath) {
    productFeed = await csvToJson(options.productFilePath);
  } else {
    productFeed = await csvToJson(
      path.join(templatesFolder, `${options.template}_product_feed.csv`)
    );
  }

  // get category data from provided file or template
  if (options.categoryFilePath) {
    categoryFeed = await csvToJson(options.categoryFilePath);
  } else {
    categoryFeed = await csvToJson(
      path.join(templatesFolder, `${options.template}_category_feed.csv`)
    );
  }
  const categoryIDMap = new Map<string, string>();
  for (let row of categoryFeed) {
    const categoryIDFormatted = (row.breadcrumbs.length > 0 ? row.breadcrumbs : row.name)
      .replace(/[`~!@#$%^&*()|+=?;:'",.<>{}[\]\\/]/gi, '') // Remove most special characters (not hyphens/underscores)
      .replace(/ /g, '') // Remove spaces
      .toLowerCase();
    categoryIDMap.set(categoryIDFormatted, row.ccid);
  }
  const buyer = await getBuyer(options.buyerID);
  console.log(chalk.greenBright(`Using buyer: '${buyer.Name}'`));
  const catalog = await getCatalog(buyer, options.catalogID);
  console.log(chalk.greenBright(`Using catalog: '${catalog.Name}'`));
  await assignBuyerToCatalog(buyer, catalog);
  const categoryIDs = await categoryBuilder(categoryFeed, categoryIDMap, catalog.ID); // (Category Feed file, Category ID Map from Category Feed file, CatalogID)
  await postCategoryAssignments(categoryIDs, catalog.ID, catalog.ID); // (CatalogID, BuyerID)
  await postProducts(productFeed, catalog.ID, options.prefixImageUrls ? catalog.ID : ''); // (Save productfeed.csv to inputData folder, Category ID Map from Category Feed file, CatalogID, optional prefix for image paths)

  if (results.categories.errors) {
    console.log(
      chalk.redBright(`Encountered ${results.categories.errors} while creating categories`)
    );
  }
  if (results.categoryAssignments.errors) {
    console.log(
      chalk.redBright(
        `Encountered ${results.categoryAssignments.errors} while assigning categories`
      )
    );
  }
  if (results.products.errors) {
    console.log(chalk.redBright(`Encountered ${results.products.errors} while creating products`));
  }
}

async function getBuyer(buyerID?: string) {
  try {
    if (buyerID) {
      return await OrderCloudSDK.Buyers.Get(buyerID);
    }
    const buyerList = await OrderCloudSDK.Buyers.List();
    if (buyerList.Items.length) {
      return buyerList.Items[0];
    }
    return await OrderCloudSDK.Buyers.Create({
      ID: '0001',
      Name: 'Default Buyer',
      Active: true,
    });
  } catch (ex) {
    console.error(chalk.redBright(`Error retrieving buyer`));
    throw ex; // exit process
  }
}

async function getCatalog(buyer: Buyer, catalogID?: string) {
  try {
    if (catalogID) {
      return await OrderCloudSDK.Catalogs.Get(catalogID);
    }
    if (buyer.DefaultCatalogID) {
      return await OrderCloudSDK.Catalogs.Get(buyer.DefaultCatalogID);
    }
    const catalogList = await OrderCloudSDK.Catalogs.List();
    if (catalogList.Items.length) {
      return catalogList.Items[0];
    }
    return await OrderCloudSDK.Catalogs.Create({
      ID: '0001',
      Name: 'Default Catalog',
      Active: true,
    });
  } catch (ex) {
    console.error(chalk.redBright(`Error retrieving catalog`));
    throw ex; // exit process
  }
}

async function assignBuyerToCatalog(buyer: Buyer, catalog: Catalog) {
  try {
    await OrderCloudSDK.Catalogs.SaveAssignment({
      BuyerID: buyer.ID,
      CatalogID: catalog.ID,
      ViewAllCategories: true,
      ViewAllProducts: true,
    });
  } catch (ex) {
    handleError(`Error assigning buyer to catalog`, ex);
    throw ex; // exit process
  }
}

async function categoryBuilder(
  categoryFeed: any[],
  categoryIDMap: Map<string, string>,
  catalogID: string
) {
  const total = categoryFeed.length;
  results.categories.total = total;
  console.log(chalk.greenBright(`Found ${categoryFeed.length} category rows to import`));
  const processedCategoryIDs = new Set<string>();

  for (let row of categoryFeed) {
    results.categories.processed++;
    if (results.categories.processed % 25 === 0) {
      console.log(
        chalk.magentaBright(
          `Processed ${results.categories.processed} category rows of ${results.categories.total}`
        )
      );
    }

    const categoryNames =
      row.breadcrumbs.split('>').length > 0 ? row.breadcrumbs.split('>') : [row.name];
    let categoryID = '';
    let parentCategoryID = '';

    for (let catName of categoryNames) {
      const categoryNameFormatted = catName.trimStart().trimEnd();
      const categoryIDFormatted = catName
        .replace(/[`~!@#$%^&*()|+=?;:'",.<>{}[\]\\/]/gi, '') // Remove most special characters (not hyphens/underscores)
        .replace(/ /g, '') // Remove spaces
        .toLowerCase();
      categoryID += categoryIDFormatted;
      const matchingCategoryID = categoryIDMap.get(categoryID);
      if (processedCategoryIDs.has(matchingCategoryID)) {
        parentCategoryID = matchingCategoryID;
        continue;
      } else {
        processedCategoryIDs.add(matchingCategoryID);
        await postCategory(
          matchingCategoryID,
          categoryNameFormatted,
          parentCategoryID,
          catalogID,
          row.url_path,
          row.breadcrumbs
        );
        parentCategoryID = matchingCategoryID;
      }
    }
  }
  return processedCategoryIDs;
}

async function postCategory(
  categoryID: string,
  categoryName: string,
  parentCategoryID: string,
  catalogID: string,
  urlPath: string,
  breadcrumbs: string
) {
  const categoryRequest = {
    ID: categoryID,
    Active: true,
    Name: categoryName,
    ParentID: parentCategoryID,
    xp: {
      UrlPath: urlPath,
      Breadcrumbs: breadcrumbs,
    },
  };
  try {
    return await OrderCloudSDK.Categories.Save(catalogID, categoryRequest.ID, categoryRequest);
  } catch (ex) {
    results.categories.errors++;
    handleError(`Error creating category ${categoryName}`, ex);
  }
}

async function postCategoryAssignments(
  categoryIDSet: Set<string>,
  catalogID: string,
  buyerID: string
) {
  const categoryIDs = Array.from(categoryIDSet);
  results.categoryAssignments.total = categoryIDs.length;
  console.log(chalk.greenBright(`Found ${categoryIDs.length} categories to assign`));
  await helpers.batchOperations(
    categoryIDs,
    async function singleOperation(categoryID: string): Promise<any> {
      results.categoryAssignments.processed++;
      if (results.categoryAssignments.processed % 100 === 0) {
        console.log(
          chalk.magentaBright(
            `Assigned ${results.categoryAssignments.processed} categories of ${results.categoryAssignments.total}`
          )
        );
      }
      // Post category assignment
      const categoryAssignmentRequest = {
        CategoryID: categoryID,
        BuyerID: buyerID,
        Visible: true,
        ViewAllProducts: true,
      };

      try {
        await OrderCloudSDK.Categories.SaveAssignment(catalogID, categoryAssignmentRequest);
      } catch (ex) {
        results.categoryAssignments.errors++;
        handleError(`Error assigning categoryID: ${categoryID}`, ex);
      }
    }
  );
}

async function postProducts(productFeed: any[], catalogID: string, imageUrlPrefix = '') {
  console.log(chalk.greenBright(`Found ${productFeed.length} products to import`));
  results.products.total = productFeed.length;

  // We need to save the variant rows from the product feed for each product ID in order to eventually update the variant IDs, imageUrls
  const productIdToVariantRowsMap = new Map<string, any[]>();

  for (let row of productFeed) {
    if (row.product_group !== row.sku) {
      // First time we encounter a variant of that product so we process it
      if (!productIdToVariantRowsMap.has(row.product_group)) {
        await processSingleProduct(row, catalogID, imageUrlPrefix);

        // Initialize the map entry
        productIdToVariantRowsMap.set(row.product_group, []);
      }

      // Add the variant row to the corresponding map entry
      productIdToVariantRowsMap.set(row.product_group, [
        ...productIdToVariantRowsMap.get(row.product_group),
        row,
      ]);
    }
  }

  // Create the specs for all the products with variants
  await createSpecs(productIdToVariantRowsMap);

  // Generate the variants for all corresponding products
  await generateVariants(productIdToVariantRowsMap);

  // Update the variants (IDs, imageUrls)
  await updateVariants(productIdToVariantRowsMap, imageUrlPrefix);

  // Process the normal products without variants
  await helpers.batchOperations(
    productFeed,
    async function singleOperation(row: any): Promise<any> {
      results.products.processed++;
      if (results.products.processed % 100 === 0) {
        console.log(
          chalk.magentaBright(
            `Processed ${results.products.processed} products of ${results.products.total}`
          )
        );
      }

      // Normal product without variants
      if (row.product_group === row.sku) {
        await processSingleProduct(row, catalogID, imageUrlPrefix);
      }
    }
  );
}

function handleError(message, err: any): void {
  console.error(chalk.red(message));
  if (err.isOrderCloudError) {
    console.error(
      chalk.redBright(
        `${err.request.method} ${err.request.protocol + err.request.host + err.request.path}`
      )
    );
    console.error(chalk.redBright(JSON.stringify(err.errors, null, 4)));
  } else {
    console.error(chalk.redBright(err?.message));
  }
}

async function processSingleProduct(row: any, catalogID: string, imageUrlPrefix: string) {
  // Post price schedule
  const priceScheduleRequest = {
    ID: row.product_group,
    Name: row.name,
    PriceBreaks: [
      {
        Quantity: 1,
        Price: row.final_price,
      },
    ],
  };

  try {
    await OrderCloudSDK.PriceSchedules.Save(priceScheduleRequest.ID, priceScheduleRequest);
  } catch (ex) {
    results.products.errors++;
    handleError(`Error creating priceschedule for product ${row.product_group}`, ex);
    return;
  }

  const additionalImageUrls: { Url: string; ThumbnailUrl: string }[] =
    row.additional_image_urls.length > 0
      ? row.additional_image_urls.split('|').map((imgUrl: string) => ({
          Url: imageUrlPrefix + imgUrl,
          ThumbnailUrl: '',
        }))
      : [];

  const productRequest = {
    ID: row.product_group,
    Name: row.name,
    Active: true,
    Description: row.description,
    DefaultPriceScheduleID: row.product_group,
    xp: {
      Images: [
        {
          Url: imageUrlPrefix + row.image_url,
          ThumbnailUrl: '',
        },
        ...additionalImageUrls,
      ],
      Status: 'Draft',
      IsResale: false,
      IntegrationData: null,
      HasVariants: false,
      Note: '',
      Tax: {
        Category: 'P0000000',
        Code: 'PC030156',
        Description: 'Clothing And Related Products (Business-To-Business)-Work clothes (other)',
      },
      UnitOfMeasure: {
        Qty: 1,
        Unit: 'Per',
      },
      ProductType: 'Standard',
      SizeTier: 'D',
      Accessorials: null,
      Currency: 'USD',
      ArtworkRequired: false,
      PromotionEligible: true,
      FreeShipping: false,
      FreeShippingMessage: 'Free Shipping',
      Documents: null,
      Brand: row.brand,
      ProductUrl: row.product_url,
    },
  };

  try {
    await OrderCloudSDK.Products.Save(productRequest.ID, productRequest);
  } catch (ex) {
    results.products.errors++;
    handleError(`Error creating product ${row.product_group}`, ex);
    return;
  }

  // Post category-product assignment
  const categoriesSplitByPipe = row.ccids.split('|');
  const categoryBreadcrumbs = [];
  for (let pipeSplitCategory of categoriesSplitByPipe) {
    const categoryIDFormatted = pipeSplitCategory
      .replace(/[`~!@#$%^&*()|+=?;:'",.<>{}[\]\\/]/gi, '') // Remove most special characters (not hyphens/underscores)
      .replace(/ /g, '') // Remove spaces
      .toLowerCase();
    try {
      const categoryProductAssignmentRequest = {
        CategoryID: categoryIDFormatted,
        ProductID: row.product_group,
      };
      await OrderCloudSDK.Categories.SaveProductAssignment(
        catalogID,
        categoryProductAssignmentRequest
      );
    } catch (ex) {
      results.products.errors++;
      handleError(
        `Error assigning product ${row.product_group} to category ${categoryIDFormatted}`,
        ex
      );
      return;
    }

    // Get the specific category's URL path and breadcrumbs name in order to construct the category breadcrumbs for the product
    try {
      const category = await OrderCloudSDK.Categories.Get(catalogID, categoryIDFormatted);
      categoryBreadcrumbs.push({
        UrlPath: category.xp.UrlPath,
        BreadcrumbsName: category.xp.Breadcrumbs,
      });
    } catch (ex) {
      results.categories.errors++;
      handleError(`Error getting category ${categoryIDFormatted}`, ex);
      return;
    }
  }

  // Update the product's XP with the category breadcrumbs
  try {
    await OrderCloudSDK.Products.Patch(row.product_group, {
      xp: { CategoryBreadcrumbs: categoryBreadcrumbs },
    });
  } catch (ex) {
    results.products.errors++;
    handleError(`Error updating product ${row.product_group}`, ex);
    return;
  }
}

async function createSpecs(productIdToVariantRowsMap: Map<string, any[]>) {
  const possibleSpecs: string[] = ['Color', 'Size'];

  for (let productId of productIdToVariantRowsMap.keys()) {
    for (let specName of possibleSpecs) {
      if (productIdToVariantRowsMap.get(productId)[0][specName.toLowerCase()]) {
        try {
          await OrderCloudSDK.Specs.Save(`${productId}-${specName}`, {
            ID: `${productId}-${specName}`,
            Name: specName,
            Required: true,
            DefinesVariant: true,
          });
        } catch (ex) {
          results.products.errors++;
          handleError(`Error creating spec for product ${productId}`, ex);
          return;
        }

        for (let variantRow of productIdToVariantRowsMap.get(productId)) {
          // Create all the spec options of this spec for each variant of this specific product
          await createSpecOptions(productId, specName, variantRow);
        }

        // Assign this product to the spec
        await createSpecProductAssignment(productId, specName);
      }
    }
  }
}

async function createSpecOptions(productId: string, specName: string, variantRow: any) {
  try {
    await OrderCloudSDK.Specs.SaveOption(
      `${productId}-${specName}`,
      `${productId}-${specName}-${variantRow[specName.toLowerCase()]}`,
      {
        ID: `${productId}-${specName}-${variantRow[specName.toLowerCase()]}`,
        Value: variantRow[specName.toLowerCase()],
      }
    );
  } catch (ex) {
    results.products.errors++;
    handleError(`Error creating spec option for product ${variantRow.sku}`, ex);
    return;
  }
}

async function createSpecProductAssignment(productId: string, specName: string) {
  try {
    await OrderCloudSDK.Specs.SaveProductAssignment({
      SpecID: `${productId}-${specName}`,
      ProductID: productId,
    });
  } catch (ex) {
    results.products.errors++;
    handleError(`Error creating spec product assignment for product ${productId}`, ex);
    return;
  }
}

async function generateVariants(productIdToVariantRowsMap: Map<string, any[]>) {
  for (let productId of productIdToVariantRowsMap.keys()) {
    // Generate the variants for this specific product
    try {
      await OrderCloudSDK.Products.GenerateVariants(productId, { overwriteExisting: true });
    } catch (ex) {
      results.products.errors++;
      handleError(`Error generating variants for product ${productId}`, ex);
      return;
    }
  }
}

async function updateVariants(
  productIdToVariantRowsMap: Map<string, any[]>,
  imageUrlPrefix: string
) {
  for (let productId of productIdToVariantRowsMap.keys()) {
    // Retrieve the variants for this specific product
    let productVariants: Variant[] = [];
    try {
      // Variants are returned in reverse order than the one that appears in the product feed
      productVariants = (await OrderCloudSDK.Products.ListVariants(productId))?.Items;
    } catch (ex) {
      results.products.errors++;
      handleError(`Error retrieving variants for product ${productId}`, ex);
      return;
    }

    // Update the variants (IDs, imageUrls) of this specific product
    for (let variant of productVariants) {
      let variantRow = productIdToVariantRowsMap.get(productId)?.pop();
      let additionalSkuImageUrls: { Url: string; ThumbnailUrl: string }[] =
        variantRow.additional_sku_image_urls.length > 0
          ? variantRow.additional_sku_image_urls.split('|').map((imgUrl: string) => ({
              Url: imageUrlPrefix + imgUrl,
              ThumbnailUrl: '',
            }))
          : [];

      try {
        await OrderCloudSDK.Products.PatchVariant(productId, variant.ID, {
          ID: variantRow.sku,
          xp: {
            Images: [
              {
                Url: imageUrlPrefix + variantRow.sku_image_url,
                ThumbnailUrl: '',
              },
              ...additionalSkuImageUrls,
            ],
            SkuUrl: variantRow.sku_url,
          },
        });
      } catch (ex) {
        results.products.errors++;
        handleError(`Error updating variant ${variant.ID} for product ${productId}`, ex);
        return;
      }
    }
  }
}

export default {
  run,
};
