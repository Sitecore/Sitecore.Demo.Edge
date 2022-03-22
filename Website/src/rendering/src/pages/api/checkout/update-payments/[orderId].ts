import { NextApiHandler } from 'next';
import { DPayment } from 'src/models/ordercloud/DPayment';
import { Orders, Payments, RequiredDeep } from 'ordercloud-javascript-sdk';
import { DOrder } from 'src/models/ordercloud/DOrder';
import withOcUserAuth from 'src/edge/ordercloud/middleware/withOcUserAuth';
import { getUserToken, initializeMiddlewareClient } from 'src/edge/ordercloud/utils';
import withOcErrorHandler from 'src/edge/ordercloud/middleware/withOcErrorHandler';
import { CatalystBaseError } from '@ordercloud/catalyst';

/**
 * This endpoint is called by the buyer app when needing to update payments it will receive the expected payments
 * and then will handle deleting, updating, or creating new payments as needed
 * logic is here instead of frontend because to set payment.Accepted to true on payment.Type == 'CreditCard' we need
 * the special role of OrderAdmin which is granted to our middleware client but not buyer users (for security reasons)
 */
const routeHandler: NextApiHandler<RequiredDeep<DPayment>[]> = async (request, response) => {
  await initializeMiddlewareClient();

  const { orderId } = request.query as { orderId: string };
  const requestedPayments = request.body?.Payments as RequiredDeep<DPayment>[];
  const userToken = getUserToken(request);
  if (!orderId) {
    throw new CatalystBaseError('Payments.MissingOrderId', 'Missing required parameter orderId');
  }
  if (!requestedPayments?.length) {
    throw new CatalystBaseError(
      'Payments.MissingRequestBody',
      'Missing required request body Payments of type DPayment[]'
    );
  }
  const order = await Orders.Get<DOrder>('All', orderId);
  let existingPayments = (await Payments.List<DPayment>('All', orderId)).Items;
  existingPayments = await deleteStalePayments(requestedPayments, existingPayments, order);

  const updateRequests: Promise<void>[] = [];
  requestedPayments.forEach((requestedPayment) => {
    const existingPayment = existingPayments.find(
      (payment) => payment.Type === requestedPayment.Type
    );
    if (requestedPayment.Type === 'CreditCard') {
      updateRequests.push(
        updateCreditCardPayment(requestedPayment, existingPayment, order, userToken)
      );
    } else if (requestedPayment.Type === 'SpendingAccount') {
      updateRequests.push(
        updateSpendingAccountpayment(requestedPayment, existingPayment, order, userToken)
      );
    } else {
      updateRequests.push(updatePurchaseOrderPayment(existingPayment, order));
    }
  });
  await Promise.all(updateRequests);
  const updatedPayments = (await Payments.List<DPayment>('All', order.ID)).Items;

  return response.status(200).json(updatedPayments);
};

async function deleteStalePayments(
  requestedPayments: RequiredDeep<DPayment>[],
  existingPayments: RequiredDeep<DPayment>[],
  order: DOrder
): Promise<RequiredDeep<DPayment>[]> {
  // requestedPayments represents the payments that should be on the order
  // if there are any existing payments not reflected in requestedPayments then they should be deleted

  const toDeletePayments = existingPayments.filter((existingPayment) => {
    return requestedPayments.some((payment) => payment.Type === existingPayment.Type);
  });
  const toDeleteRequests = toDeletePayments.map((payment) =>
    Payments.Delete('All', order.ID, payment.ID)
  );
  await Promise.all(toDeleteRequests);
  return existingPayments.filter((payment) => {
    // filter out any payments that were deleted
    return !toDeletePayments.find((deletedPayment) => deletedPayment.ID === payment.ID);
  });
}

async function updateCreditCardPayment(
  requestedPayment: RequiredDeep<DPayment>,
  existingPayment: RequiredDeep<DPayment>,
  order: DOrder,
  userToken: string
): Promise<void> {
  // Note: we pass user's token when creating a new payment because otherwise if they are paying with
  // a personal credit card we'll get a 404 since our middleware user doesn't have access to it

  if (existingPayment === null) {
    // payment doesn't exist yet, create new
    await Payments.Create(
      'All',
      order.ID,
      {
        Amount: order.Total,
        Accepted: true,
        CreditCardID: requestedPayment.CreditCardID,
        Type: 'CreditCard',
      },
      { accessToken: userToken }
    );
  } else if (existingPayment.CreditCardID !== requestedPayment.CreditCardID) {
    // can't simply update payment if CreditCardID changed, need to delete and create new
    await Payments.Delete('All', order.ID, existingPayment.ID);
    await Payments.Create(
      'All',
      order.ID,
      {
        Amount: order.Total,
        Accepted: true,
        CreditCardID: requestedPayment.CreditCardID,
        Type: 'CreditCard',
      },
      { accessToken: userToken }
    );
  } else if (existingPayment.Accepted && existingPayment.Amount === order.Total) {
    // do nothing, no updates needed
  } else {
    // update payment
    await Payments.Patch('All', order.ID, existingPayment.ID, {
      Amount: order.Total,
      Accepted: true,
    });
  }
}

async function updateSpendingAccountpayment(
  requestedPayment: RequiredDeep<DPayment>,
  existingPayment: RequiredDeep<DPayment>,
  order: DOrder,
  userToken: string
): Promise<void> {
  // Note: we pass user's token when creating a new payment because otherwise if they are paying with
  // a personal spending account we'll get a 404 since our middleware user doesn't have access to it

  if (existingPayment === null) {
    // payment doesn't exist yet, create new
    await Payments.Create(
      'All',
      order.ID,
      {
        Amount: order.Total,
        SpendingAccountID: requestedPayment.SpendingAccountID,
        Type: 'SpendingAccount',
      },
      { accessToken: userToken }
    );
  } else if (existingPayment.SpendingAccountID !== requestedPayment.SpendingAccountID) {
    // can't simply update payment if SpendingAccountID changed, need to delete and create new
    await Payments.Delete('All', order.ID, existingPayment.ID);
    await Payments.Create(
      'All',
      order.ID,
      {
        Amount: order.Total,
        SpendingAccountID: requestedPayment.SpendingAccountID,
        Type: 'SpendingAccount',
      },
      { accessToken: userToken }
    );
  } else if (existingPayment.Accepted && existingPayment.Amount === order.Total) {
    // do nothing, no updates needed
  } else {
    // update payment
    await Payments.Patch('All', order.ID, existingPayment.ID, {
      Amount: order.Total,
      Accepted: true,
    });
  }
}

async function updatePurchaseOrderPayment(
  existingPayment: RequiredDeep<DPayment>,
  order: DOrder
): Promise<void> {
  if (existingPayment === null) {
    // payment doesn't exist yet, create new
    await Payments.Create('All', order.ID, {
      Amount: order.Total,
      Type: 'PurchaseOrder',
    });
  } else if (existingPayment.Amount === order.Total) {
    // do nothing, no updates needed
  } else {
    // update payment
    await Payments.Patch('All', order.ID, existingPayment.ID, {
      Amount: order.Total,
    });
  }
}

export default withOcErrorHandler(withOcUserAuth(routeHandler));
