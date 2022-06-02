import { NextApiHandler } from 'next';
import * as OrderCloudSDK from 'ordercloud-javascript-sdk';
import * as fs from 'fs';
import csv from 'csvtojson';
import path from 'path';

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
  await Promise.allSettled(categoryPromises.map((categoryPromise) => categoryPromise()));
  return await Promise.allSettled(
    categoryPromisesWithParents.map((categoryPromise) => categoryPromise())
  );
}

async function postCategory(
  categoryID: string,
  categoryName: string,
  parentCategoryID: string,
  catalogID: string
) {
  const categoryRequest = {
    ID: categoryID,
    Active: true,
    Name: categoryName,
    ParentID: parentCategoryID,
  };
  return await OrderCloudSDK.Categories.Save(catalogID, categoryRequest.ID, categoryRequest);
}

const handler: NextApiHandler<unknown> = async (_request, response) => {
  try {
    OrderCloudSDK.Configuration.Set({
      baseApiUrl: process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL,
    });

    const catalogList = await OrderCloudSDK.Catalogs.List();
    const catalogID = catalogList.Items[0].ID;

    await postCategories(catalogID);

    return response.status(200).json('Categories synced successfully');
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

export default handler;
