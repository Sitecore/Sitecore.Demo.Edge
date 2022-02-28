// loaders let us retrieve async data before a story is rendered
// this loader specifically ensures the session has three line items created (assuming there are three products visible to user)
// https://storybook.js.org/docs/react/writing-stories/loaders

import { orderCloudScope } from '../../constants/ordercloud-scope';
import { Configuration, Tokens, Auth, Me, LineItems, Orders } from 'ordercloud-javascript-sdk';
import { DOrder } from 'src/models/ordercloud/DOrder';
import { DLineItem } from 'src/models/ordercloud/DLineItem';
import { DUser } from 'src/models/ordercloud/DUser';

if (
  !process.env['STORYBOOK__ORDERCLOUD_BUYER_CLIENT_ID'] ||
  !process.env['STORYBOOK__ORDERCLOUD_BASE_API_URL']
) {
  throw new Error(
    'Please provide environment variables for storybook in .storybook/.env.storybook'
  );
}
const clientID = process.env['STORYBOOK__ORDERCLOUD_BUYER_CLIENT_ID'];
const baseApiUrl = process.env['STORYBOOK__ORDERCLOUD_BASE_API_URL'];
Configuration.Set({
  baseApiUrl,
  clientID,
});

export async function checkoutLoader(): Promise<DCheckoutLoader> {
  const token = await getValidToken();
  Tokens.SetAccessToken(token);

  const currentUser = await Me.Get();
  const order = await getOrder();
  const lineItems = await getLineItems(order.ID);

  return {
    currentUser,
    order,
    lineItems,
  };
}

async function getValidToken(): Promise<string> {
  const token = Tokens.GetAccessToken();
  if (token) {
    return token;
  } else {
    const response = await Auth.Anonymous(clientID, orderCloudScope);
    return response['access_token'];
  }
}

async function getOrder(): Promise<DOrder> {
  const myOrders = await Me.ListOrders<DOrder>({
    sortBy: ['DateCreated'],
    filters: { Status: 'Unsubmitted' },
  });
  if (myOrders.Items.length) {
    return myOrders.Items[0];
  } else {
    return await Orders.Create('All', {});
  }
}

async function getLineItems(orderID: string): Promise<DLineItem[]> {
  const lineItems = await LineItems.List<DLineItem>('All', orderID);
  if (lineItems.Items.length) {
    return lineItems.Items;
  } else {
    const products = await Me.ListProducts({ pageSize: 3 });
    const lineItemRequests = products.Items.map((product) => {
      return LineItems.Create<DLineItem>('All', orderID, { ProductID: product.ID, Quantity: 1 });
    });
    return await Promise.all(lineItemRequests);
  }
}

export interface DCheckoutLoader {
  currentUser: DUser;
  order: DOrder;
  lineItems: DLineItem[];
}
