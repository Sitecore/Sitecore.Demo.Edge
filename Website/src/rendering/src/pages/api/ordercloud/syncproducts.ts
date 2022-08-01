import { NextApiHandler } from 'next';
import * as fs from 'fs';
import csv from 'csvtojson';
import path from 'path';
import {
  Auth,
  Buyers,
  Catalogs,
  Categories,
  Configuration,
  PriceSchedules,
  ProductFacets,
  Products,
  Specs,
  Tokens,
  Variant,
} from 'ordercloud-javascript-sdk';
import {
  PUBLIC_BUYER_NAME,
  PUBLIC_HEADSTART_CATALOG_ID,
  PROFILED_BUYER_NAME,
  PROFILED_HEADSTART_CATALOG_ID,
  ADMIN_ADDRESS_ID,
} from '../../../constants/seeding';
import { uniq } from 'lodash';

// TODO: the part that creates products and the part that assigns them are coupled
// it would be ideal to only create products once, and then assign the created products to
// profiled and public buyer separately
const handler: NextApiHandler<unknown> = async (request, response) => {
  const middlewareClientID = request.query?.MiddlewareClientID as string;
  const middlewareClientSecret = request.query?.MiddlewareClientSecret as string;

  if (!middlewareClientID) {
    return response.status(400).json({ Error: 'Missing required parameter MiddlewareClientID' });
  }
  if (!middlewareClientSecret) {
    return response
      .status(400)
      .json({ Error: 'Missing required parameter MiddlewareClientSecret' });
  }

  try {
    // First we need to authenticate
    Configuration.Set({
      baseApiUrl: process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL,
    });
    const authResponse = await Auth.ClientCredentials(middlewareClientSecret, middlewareClientID, [
      'FullAccess',
    ]);
    Tokens.SetAccessToken(authResponse.access_token);

    const buyersList = await Buyers.List({
      filters: { Name: `${PUBLIC_BUYER_NAME}|${PROFILED_BUYER_NAME}` },
    });

    // Create or update product facets
    await postFacets();

    // Create products for profiled buyer
    const profiledBuyer = buyersList.Items.find((buyer) => buyer.Name === PROFILED_BUYER_NAME);
    await postProducts(
      profiledBuyer.DefaultCatalogID,
      profiledBuyer.ID,
      PROFILED_HEADSTART_CATALOG_ID
    );

    // Create products for public buyer
    const publicBuyer = buyersList.Items.find((buyer) => buyer.Name === PUBLIC_BUYER_NAME);
    await postProducts(publicBuyer.DefaultCatalogID, publicBuyer.ID, PUBLIC_HEADSTART_CATALOG_ID);

    return response.status(200).json('Products synced successfully');
    /* eslint-disable-next-line */
  } catch (error: any) {
    if (error.isOrderCloudError) {
      // the request was made and the API responded with a status code
      // that falls outside of the range of 2xx, the error will be of type OrderCloudError
      // https://ordercloud-api.github.io/ordercloud-javascript-sdk/classes/orderclouderror
      const message = error.message;
      const errors = JSON.stringify(error.errors, null, 4);
      const requestUrl = `${error.request.method} ${process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL}${error.request.path}`;
      console.log('-------ERROR-------');
      console.log(requestUrl);
      console.log(message);
      console.log(errors);
      console.log('-----END ERROR-----');
      return response.status(500).json({
        RequestUrl: requestUrl,
        Message: message,
        Errors: errors,
      });
    } else if (error.request) {
      // the request was made but no response received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      console.log(error.request);
      return response.status(500).json({
        Message: `An unknown error occurred (no response) while making a request to ${error.request.url}`,
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      return response.status(500).json({
        Message: `An error occurred wile setting up an http request that triggered an error. ${error.message}`,
      });
    }
  }
};

type ProductRow = {
  product_group: string;
  name: string;
  description: string;
  final_price: number;
  brand: string;
  image_url: string;
  additional_image_urls: string;
  product_url: string;
  ccids: string;
  sku: string;
  color: string;
  size: string;
};

type VariantRow = {
  sku: string;
  sku_url: string;
  sku_image_url: string;
  additional_sku_image_urls: string;
  color: string;
  size: string;
};

async function postFacets() {
  await Promise.all([
    ProductFacets.Save('color', {
      ID: 'color',
      Name: 'Color',
      XpPath: 'Facets.color',
      MinCount: 1,
      xp: {
        Options: [
          'Red',
          'Orange',
          'Yellow',
          'Green',
          'Blue',
          'Purple',
          'Grey',
          'Black',
          'White',
          'Brown',
          'Pink',
          'Neutral',
        ],
      },
    }),
    ProductFacets.Save('size', {
      ID: 'size',
      Name: 'Size',
      XpPath: 'Facets.size',
      MinCount: 1,
      xp: {
        Options: ['S', 'M', 'L'],
      },
    }),
  ]);
}

async function postProducts(catalogID: string, buyerID: string, headstartCatalogID: string) {
  const csvStr = fs.readFileSync(
    path.join(__dirname + '/../../../../../discover-feeds/playsummit_product_feed.csv'),
    {
      encoding: 'utf8',
    }
  );
  const productFeed = await csv().fromString(csvStr);

  // We need to save the variant rows from the product feed for each product ID
  // in order to eventually update the variant IDs, imageUrls
  const productIdToVariantRowsMap = new Map<string, VariantRow[]>();

  // Store the product promises (for normal products) in order to run them all together in parallel
  const productPromises = [];

  for (const row of productFeed) {
    if (row.product_group !== row.sku) {
      // First time we encounter a variant of that product so we process it
      if (!productIdToVariantRowsMap.has(row.product_group)) {
        await processSingleProduct(row, catalogID, buyerID, headstartCatalogID);

        // Initialize the map entry
        productIdToVariantRowsMap.set(row.product_group, []);
      }

      // Add the variant row to the corresponding map entry
      productIdToVariantRowsMap.set(row.product_group, [
        ...productIdToVariantRowsMap.get(row.product_group),
        row,
      ]);
    } else {
      // Normal product without variants
      productPromises.push(() => processSingleProduct(row, catalogID, buyerID, headstartCatalogID));
    }
  }

  // Update facets for any product with variants to include all possible options
  await patchProductWithVariantFacets(productIdToVariantRowsMap);

  // Create the specs for all the products with variants
  await createSpecs(productIdToVariantRowsMap);

  // Generate the variants for all corresponding products
  await generateVariants(productIdToVariantRowsMap);

  // Update the variants (IDs, imageUrls)
  await updateVariants(productIdToVariantRowsMap);

  return await Promise.all(productPromises.map((productPromise) => productPromise()));
}

async function processSingleProduct(
  row: ProductRow,
  catalogID: string,
  buyerID: string,
  headstartCatalogID: string
) {
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
  console.log(`Creating price schedule for ${row.product_group}`);
  await PriceSchedules.Save(priceScheduleRequest.ID, priceScheduleRequest);

  const additionalImageUrls: { Url: string; ThumbnailUrl: string }[] =
    row.additional_image_urls.length > 0
      ? row.additional_image_urls.split('|').map((imgUrl: string) => ({
          Url: imgUrl,
          ThumbnailUrl: '',
        }))
      : [];

  const productRequest = {
    ID: row.product_group,
    Name: row.name,
    Active: true,
    Description: row.description,
    DefaultPriceScheduleID: row.product_group,
    ShipFromAddressID: ADMIN_ADDRESS_ID,
    xp: {
      Images: [
        {
          Url: row.image_url,
          ThumbnailUrl: '',
        },
        ...additionalImageUrls,
      ],
      Status: 'Draft',
      UnitOfMeasure: {
        Qty: 1,
        Unit: 'Per',
      },
      ProductType: 'Standard',
      Currency: 'USD',
      Brand: row.brand,
      ProductUrl: row.product_url,
      CCID: row.ccids.split('|')?.[0],
      Price: Number(row.final_price), // using b2c retail price as basis for sorting, may not match real price user sees
      Facets: {
        // avoid setting to empty string else will be indexed but not have a value so will appear empty
        color: row.color ? row.color : null,
        size: row.size ? row.size : null,
      },
    },
  };

  console.log(`Creating product schedule for ${row.product_group}`);
  const createdProduct = await Products.Save(productRequest.ID, productRequest);
  console.log(`Assigning product ${row.product_group} to catalog ${catalogID}`);
  await Catalogs.SaveProductAssignment({
    CatalogID: catalogID,
    ProductID: createdProduct.ID,
  });

  console.log(
    `Assigning product ${row.product_group} to headstart catalog (usergroup) ${headstartCatalogID}`
  );
  await Products.SaveAssignment({
    ProductID: createdProduct.ID,
    BuyerID: buyerID,
    UserGroupID: headstartCatalogID,
  });

  const categoryIDs = row.ccids.split('|');
  console.log(
    `Assigning categories ${categoryIDs.join(',')} in catalog ${catalogID} to product ${
      createdProduct.ID
    }`
  );

  const categoryAssignmentRequests = categoryIDs.map((categoryID) =>
    Categories.SaveProductAssignment(catalogID, {
      CategoryID: categoryID,
      ProductID: createdProduct.ID,
    })
  );
  await Promise.all(categoryAssignmentRequests);
}

async function patchProductWithVariantFacets(productIdToVariantRowsMap: Map<string, VariantRow[]>) {
  // if a product has variants then then we want to make all of those facet options available for querying
  const productIds = productIdToVariantRowsMap.keys();
  for (const productId of productIds) {
    const variants = productIdToVariantRowsMap.get(productId);
    if (variants?.length) {
      const colorFacets = uniq(variants.map((variant) => variant.color));
      const sizeFacets = uniq(variants.map((variant) => variant.size));
      if (colorFacets?.length || sizeFacets?.length) {
        await Products.Patch(productId, {
          xp: {
            Facets: {
              color: colorFacets,
              size: sizeFacets,
            },
          },
        });
      }
    }
  }
}

async function createSpecs(productIdToVariantRowsMap: Map<string, VariantRow[]>) {
  const possibleSpecs: string[] = ['Color', 'Size'];

  const productIds = productIdToVariantRowsMap.keys();
  for (const productId of productIds) {
    let specListOrder = 1;

    for (const specName of possibleSpecs) {
      let specOptionListOrder = 1;

      if (productIdToVariantRowsMap.get(productId)[0][specName.toLowerCase() as keyof VariantRow]) {
        const specID = `${productId}-${specName}`;
        console.log(`Creating spec with ID ${specID}`);
        await Specs.Save(`${productId}-${specName}`, {
          ID: specID,
          Name: specName,
          Required: true,
          DefinesVariant: true,
          ListOrder: specListOrder,
        });

        const existingSpecOptionValues: string[] = [];
        const variantRows = productIdToVariantRowsMap.get(productId);
        for (const variantRow of variantRows) {
          // If the spec option already exists we skip this iteration
          if (
            existingSpecOptionValues.includes(
              variantRow[specName.toLowerCase() as keyof typeof variantRow]
            )
          ) {
            continue;
          }
          // Create a spec option of this spec for each variant of this specific product
          await createSpecOption(productId, specName, variantRow, specOptionListOrder);
          existingSpecOptionValues.push(
            variantRow[specName.toLowerCase() as keyof typeof variantRow]
          );
          specOptionListOrder++;
        }

        // Assign this product to the spec
        await createSpecProductAssignment(productId, specName);
      }
      specListOrder++;
    }
  }
}

async function createSpecOption(
  productId: string,
  specName: string,
  variantRow: VariantRow,
  listOrder: number
) {
  console.log(`Saving spec option ${`${productId}-${specName}`} to product ${productId}`);
  await Specs.SaveOption(
    `${productId}-${specName}`,
    `${productId}-${specName}-${variantRow[specName.toLowerCase() as keyof typeof variantRow]}`,
    {
      ID: `${productId}-${specName}-${
        variantRow[specName.toLowerCase() as keyof typeof variantRow]
      }`,
      Value: variantRow[specName.toLowerCase() as keyof typeof variantRow],
      ListOrder: listOrder,
    }
  );
}

async function createSpecProductAssignment(productId: string, specName: string) {
  const specID = `${productId}-${specName}`;
  console.log(`Assigning spec ${specID} to ${productId}`);
  await Specs.SaveProductAssignment({
    SpecID: specID,
    ProductID: productId,
  });
}

async function generateVariants(productIdToVariantRowsMap: Map<string, VariantRow[]>) {
  const productIds = productIdToVariantRowsMap.keys();
  for (const productId of productIds) {
    // Generate the variants for this specific product
    console.log(`Generating variants for ${productId}`);
    await Products.GenerateVariants(productId, { overwriteExisting: true });
  }
}

async function updateVariants(productIdToVariantRowsMap: Map<string, VariantRow[]>) {
  const productIds = productIdToVariantRowsMap.keys();
  for (const productId of productIds) {
    // Retrieve the variants for this specific product
    let productVariants: Variant[] = [];
    // Variants are returned in reverse order than the one that appears in the product feed
    productVariants = (await Products.ListVariants(productId))?.Items;

    // Update the variants (IDs, imageUrls) of this specific product
    for (const variant of productVariants) {
      const variantRow: VariantRow = productIdToVariantRowsMap.get(productId)?.pop();
      const additionalSkuImageUrls: { Url: string; ThumbnailUrl: string }[] =
        variantRow.additional_sku_image_urls.length > 0
          ? variantRow.additional_sku_image_urls.split('|').map((imgUrl: string) => ({
              Url: imgUrl,
              ThumbnailUrl: '',
            }))
          : [];

      console.log(`Updating variant ${variant.ID} for product ${productId}`);
      await Products.PatchVariant(productId, variant.ID, {
        ID: variantRow.sku,
        xp: {
          Images: [
            {
              Url: variantRow.sku_image_url,
              ThumbnailUrl: '',
            },
            ...additionalSkuImageUrls,
          ],
          SkuUrl: variantRow.sku_url,
        },
      });
    }
  }
}

export default handler;
