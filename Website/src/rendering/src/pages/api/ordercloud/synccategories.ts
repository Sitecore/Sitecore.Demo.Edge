import { NextApiHandler } from 'next';
import * as OrderCloudSDK from 'ordercloud-javascript-sdk';
import * as fs from 'fs';
import csv from 'csvtojson';
import path from 'path';
import { Auth, Buyers, Tokens } from 'ordercloud-javascript-sdk';
import { PROFILED_BUYER_NAME, PUBLIC_BUYER_NAME } from '../../../constants/seeding';

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
    OrderCloudSDK.Configuration.Set({
      baseApiUrl: process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL,
    });
    const authResponse = await Auth.ClientCredentials(middlewareClientSecret, middlewareClientID, [
      'FullAccess',
    ]);
    Tokens.SetAccessToken(authResponse.access_token);

    console.log('Retrieving buyers');
    const buyersList = await Buyers.List({
      filters: { Name: `${PUBLIC_BUYER_NAME}|${PROFILED_BUYER_NAME}` },
    });
    const profiledBuyer = buyersList.Items.find((buyer) => buyer.Name === PROFILED_BUYER_NAME);
    const profiledBuyerPromise = postCategories(profiledBuyer.DefaultCatalogID);

    const publicBuyer = buyersList.Items.find((buyer) => buyer.Name === PUBLIC_BUYER_NAME);
    const publicBuyerPromise = postCategories(publicBuyer.DefaultCatalogID);

    await Promise.all([profiledBuyerPromise, publicBuyerPromise]);

    return response.status(200).json('Categories synced successfully');
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

type Category = {
  ccid: string;
  name: string;
  parent_ccid: string;
};

async function postCategories(catalogID: string) {
  const csvStr = fs.readFileSync(
    path.join(__dirname + '/../../../../../discover-feeds/playsummit_category_feed.csv'),
    {
      encoding: 'utf8',
    }
  );
  const categoryFeed: Category[] = await csv({
    includeColumns: /ccid|^name$/,
  }).fromString(csvStr);

  // Store the category promises in order to run them all together in parallel
  const categoryPromises = [];
  const categoryPromisesWithParents = [];

  for (const row of categoryFeed) {
    categoryPromises.push(() => postCategory(row.ccid, row.name, null, catalogID));
    categoryPromisesWithParents.push(() =>
      postCategory(row.ccid, row.name, row.parent_ccid, catalogID)
    );
  }

  // First run the category promises without the parent ccids in parallel and then update them
  // with the parent ccids (for faster execution)
  await Promise.all(categoryPromises.map((categoryPromise) => categoryPromise()));
  return await Promise.all(categoryPromisesWithParents.map((categoryPromise) => categoryPromise()));
}

async function postCategory(
  categoryID: string,
  categoryName: string,
  parentCategoryID: string,
  catalogID: string
) {
  console.log(`Creating category ${categoryID} in catalog ${catalogID}`);
  const categoryRequest = {
    ID: categoryID,
    Active: true,
    Name: categoryName,
    ParentID: parentCategoryID,
  };
  return await OrderCloudSDK.Categories.Save(catalogID, categoryRequest.ID, categoryRequest);
}

export default handler;
