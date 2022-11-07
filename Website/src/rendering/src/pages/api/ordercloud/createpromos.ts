import { NextApiHandler } from 'next';
import { Auth, Configuration, Promotion, Promotions, Tokens } from 'ordercloud-javascript-sdk';

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

    await postPromos();

    return response.status(200).json('Promos created successfully');
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

async function postPromos() {
  // Store the promo promises in order to run them all together in parallel
  const promoPromises = [];
  const promos: Promotion[] = [];

  promos.push(
    {
      ID: 'FREESHIPPING',
      Code: 'FREESHIPPING',
      Description: 'Free shipping on entire order',
      StartDate: new Date().toISOString(),
      EligibleExpression: 'true',
      ValueExpression: 'Order.ShippingCost',
      CanCombine: true,
      AllowAllBuyers: true,
      xp: {
        Type: 'FreeShipping',
        AppliesTo: 'EntireOrder',
        ScopeToSupplier: false,
        Automatic: false,
      },
    },
    {
      ID: 'FALL10',
      Code: 'FALL10',
      Description: '10% off entire order',
      StartDate: new Date().toISOString(),
      EligibleExpression: 'true',
      ValueExpression: 'Order.Subtotal * 0.1',
      CanCombine: true,
      AllowAllBuyers: true,
      xp: {
        Type: 'Percentage',
        Value: 10,
        AppliesTo: 'EntireOrder',
        ScopeToSupplier: false,
        Automatic: false,
      },
    },
    {
      ID: 'MIN300',
      Code: 'MIN300',
      Description: '$10 off entire order over $300',
      StartDate: new Date().toISOString(),
      EligibleExpression: 'true and Order.Subtotal >= 300',
      ValueExpression: '10',
      CanCombine: true,
      AllowAllBuyers: true,
      xp: {
        Type: 'FixedAmount',
        Value: 10,
        AppliesTo: 'EntireOrder',
        ScopeToSupplier: false,
        Automatic: false,
        MinReq: {
          Type: 'MinPurchase',
          Int: 300,
        },
      },
    },
    {
      ID: 'BUNDLE10',
      Code: 'BUNDLE10',
      Description: 'Buy 1 Bike Bell, Get 1 Bike Cover 10% off',
      StartDate: new Date().toISOString(),
      EligibleExpression: `items.quantity(ProductID='PSPCCBB')>= 1 and items.quantity(ProductID='PSPSBC')>=1`,
      ValueExpression: `min(((items.quantity(ProductID='PSPCCBB')-((items.quantity(ProductID='PSPCCBB')%1)))/1)*1,items.quantity(ProductID='PSPSBC')-(items.quantity(ProductID='PSPSBC')%1))*((items.total(ProductID='PSPSBC'))/items.quantity(ProductID='PSPSBC'))*0.1`,
      CanCombine: true,
      AllowAllBuyers: true,
      xp: {
        Type: 'BOGO',
        AppliesTo: 'EntireOrder',
        ScopeToSupplier: false,
        Automatic: false,
        MinReq: {
          Type: 'MinPurchase',
          Int: 300,
        },
        BOGO: {
          Type: 'Percentage',
          Value: 10,
          BuySKU: {
            SKU: 'PSPCCBB',
            Qty: 1,
          },
          GetSKU: {
            SKU: 'PSPSBC',
            Qty: 1,
          },
        },
      },
    },
    {
      ID: 'BIKECOVER20',
      LineItemLevel: true,
      Code: 'BIKECOVER20',
      Description: '20% off select products',
      StartDate: new Date().toISOString(),
      EligibleExpression: `item.ProductID = 'PSPSBC' and Order.LineItemCount >= 1`,
      ValueExpression: 'item.LineSubtotal * 0.2',
      CanCombine: true,
      AllowAllBuyers: true,
      xp: {
        Type: 'Percentage',
        Value: 20,
        AppliesTo: 'SpecificSKUs',
        ScopeToSupplier: false,
        Automatic: false,
        SKUs: ['PSPSBC'],
        MinReq: {
          Type: 'MinItemQty',
          Int: 1,
        },
      },
    }
  );

  for (const promo of promos) {
    promoPromises.push(() => postPromo(promo));
  }

  // Run the promo promises in parallel
  await Promise.all(promoPromises.map((promoPromise) => promoPromise()));
}

async function postPromo(promo: Promotion) {
  console.log(`Creating promotion ${promo.ID}`);
  return await Promotions.Save(promo.ID, promo);
}

export default handler;
