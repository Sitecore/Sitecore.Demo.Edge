import { NextApiHandler } from 'next';
import * as fs from 'fs';
import csv from 'csvtojson';
import path from 'path';
import {
  Auth,
  Buyers,
  Catalogs,
  Configuration,
  PriceSchedules,
  Products,
  Specs,
  Tokens,
  Variant,
} from 'ordercloud-javascript-sdk';
import {
  PUBLIC_BUYER_NAME,
  PROFILED_BUYER_NAME,
  PROFILED_LOCATION_ID_SUFFIX,
  PUBLIC_LOCATION_ID_SUFFIX,
} from 'src/constants/seeding';

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

    // Create products for profiled buyer
    const profiledBuyer = buyersList.Items.find((buyer) => buyer.Name === PROFILED_BUYER_NAME);
    const profiledLocationID = `${profiledBuyer.ID}-${PROFILED_LOCATION_ID_SUFFIX}`;
    await postProducts(profiledBuyer.DefaultCatalogID, profiledBuyer.ID, profiledLocationID);

    // Create products for public buyer
    const publicBuyer = buyersList.Items.find((buyer) => buyer.Name === PUBLIC_BUYER_NAME);
    const publicLocationID = `${publicBuyer.ID}-${PUBLIC_LOCATION_ID_SUFFIX}`;
    await postProducts(publicBuyer.DefaultCatalogID, publicBuyer.ID, publicLocationID);

    return response.status(200).json('Products synced successfully');
    /* eslint-disable-next-line */
  } catch (error: any) {
    if (error.isOrderCloudError) {
      // the request was made and the API responded with a status code
      // that falls outside of the range of 2xx, the error will be of type OrderCloudError
      // https://ordercloud-api.github.io/ordercloud-javascript-sdk/classes/orderclouderror
      console.log(error.message);
      console.log(JSON.stringify(error.errors, null, 4));
    } else if (error.request) {
      // the request was made but no response received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    return response.status(500).json(error);
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
};

type VariantRow = {
  sku: string;
  sku_url: string;
  sku_image_url: string;
  additional_sku_image_urls: string;
  color: string;
  size: string;
};

async function postProducts(catalogID: string, buyerID: string, locationID: string) {
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
        await processSingleProduct(row, catalogID, buyerID, locationID);

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
      productPromises.push(() => processSingleProduct(row, catalogID, buyerID, locationID));
    }
  }

  // Create the specs for all the products with variants
  await createSpecs(productIdToVariantRowsMap);

  // Generate the variants for all corresponding products
  await generateVariants(productIdToVariantRowsMap);

  // Update the variants (IDs, imageUrls)
  await updateVariants(productIdToVariantRowsMap);

  return await Promise.allSettled(productPromises.map((productPromise) => productPromise()));
}

async function processSingleProduct(
  row: ProductRow,
  catalogID: string,
  buyerID: string,
  locationID: string
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
    },
  };
  const createdProduct = await Products.Save(productRequest.ID, productRequest);
  await Catalogs.SaveProductAssignment({
    CatalogID: catalogID,
    ProductID: createdProduct.ID,
  });
  await Products.SaveAssignment({
    ProductID: createdProduct.ID,
    BuyerID: buyerID,
    UserGroupID: locationID,
  });
}

async function createSpecs(productIdToVariantRowsMap: Map<string, VariantRow[]>) {
  const possibleSpecs: string[] = ['Color', 'Size'];

  const productIds = productIdToVariantRowsMap.keys();
  for (const productId of productIds) {
    let specListOrder = 1;

    for (const specName of possibleSpecs) {
      let specOptionListOrder = 1;

      if (productIdToVariantRowsMap.get(productId)[0][specName.toLowerCase() as keyof VariantRow]) {
        await Specs.Save(`${productId}-${specName}`, {
          ID: `${productId}-${specName}`,
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
  await Specs.SaveProductAssignment({
    SpecID: `${productId}-${specName}`,
    ProductID: productId,
  });
}

async function generateVariants(productIdToVariantRowsMap: Map<string, VariantRow[]>) {
  const productIds = productIdToVariantRowsMap.keys();
  for (const productId of productIds) {
    // Generate the variants for this specific product
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
