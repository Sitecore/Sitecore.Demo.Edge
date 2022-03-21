import { NextApiHandler } from 'next';
import { Payments } from 'ordercloud-javascript-sdk';
import { getUserOrder } from 'src/edge/ordercloud/utils';
import { errorResponse } from 'src/edge/ordercloud/responses';
import { initializeMiddlewareClient } from 'src/edge/ordercloud/utils';
import { DOrder } from 'src/models/ordercloud/DOrder';
import { DPayment } from 'src/models/ordercloud/DPayment';

const routeHandler: NextApiHandler<DOrder> = async (request, response) => {
  await initializeMiddlewareClient();
  const { creditCardId } = request.query as { creditCardId: string };
  if (!creditCardId) {
    return errorResponse(response, 'Must provide credit card ID', 'Payment.MissingCreditCardID');
  }
  const order = await getUserOrder(request);
  if (!order) {
    return errorResponse(response, 'No order to create payment for', 'Payment.MissingOrder');
  }
  const payments = await Payments.List('All', order.ID);
  let existingPayment: DPayment;
  if (payments.Items.length > 1) {
    // this scenario shouldn't happen
    const deletePayments = payments.Items.map((payment) =>
      Payments.Delete('All', order.ID, payment.ID)
    );
    await Promise.all(deletePayments);
    existingPayment = null;
  } else {
    existingPayment = payments.Items.length ? payments.Items[0] : null;
  }
  if (!existingPayment) {
    const updatedPayment = await Payments.Create('All', order.ID, {
      CreditCardID: creditCardId,
      Type: 'CreditCard',
      Amount: order.Total,
      Accepted: true,
    });
    return response.status(200).json(updatedPayment);
  }
  if (
    existingPayment.CreditCardID === creditCardId &&
    existingPayment.Amount === order.Total &&
    existingPayment.Accepted
  ) {
    // nothing to change everything here is valid
    return response.status(200).json(existingPayment);
  } else if (existingPayment.CreditCardID === creditCardId) {
    const updatedPayment = await Payments.Patch('All', order.ID, existingPayment.ID, {
      Amount: order.Total,
      Accepted: true,
    });
    return response.status(200).json(updatedPayment);
  } else {
    // creditcard id changed, we can't just update the existing payment need to delete and create new one
    await Payments.Delete('All', order.ID, existingPayment.ID);
    const updatedPayment = await Payments.Create('All', order.ID, {
      CreditCardID: creditCardId,
      Type: 'CreditCard',
      Amount: order.Total,
      Accepted: true,
    });
    return response.status(200).json(updatedPayment);
  }
};

export default routeHandler;
