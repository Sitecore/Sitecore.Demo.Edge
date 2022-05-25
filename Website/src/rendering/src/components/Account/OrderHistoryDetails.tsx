import { useEffect, useState } from 'react';
import {
  IntegrationEvents,
  ListPage,
  OrderWorksheet,
  Payment,
  Payments,
  ShipMethod,
} from 'ordercloud-javascript-sdk';
import { useRouter } from 'next/router';
import { formatCurrency } from '../../helpers/CurrencyHelper';
import LineItemCard from '../Checkout/LineItemCard';
import { getOrderDate } from '../../helpers/DateHelper';

interface OrderHistoryDetailsProps {
  storyOrder?: OrderWorksheet;
  storyPayment?: ListPage<Payment>;
  storyOrderId?: string;
}

const OrderHistoryDetails = ({
  storyOrder,
  storyPayment,
  storyOrderId,
}: OrderHistoryDetailsProps): JSX.Element => {
  const [order, setOrder] = useState<OrderWorksheet>({});
  const [payment, setPayment] = useState<Payment[]>([]);
  const [shipMethod, setShipMethod] = useState<ShipMethod>({});
  const router = useRouter();
  const orderId = storyOrderId
    ? storyOrderId
    : router?.query?.order?.length > 0
    ? router.query.order
    : undefined;

  const getMyOrder = async () => {
    const myOrder = storyOrder
      ? storyOrder
      : await IntegrationEvents.GetWorksheet<OrderWorksheet>('All', orderId.toString());
    const orderPayment = storyPayment
      ? storyPayment
      : await Payments.List('All', orderId.toString());
    if (myOrder.ShipEstimateResponse.ShipEstimates.length > 0) {
      const shipMethods = myOrder.ShipEstimateResponse.ShipEstimates[0].ShipMethods;
      const selectedID = myOrder.ShipEstimateResponse.ShipEstimates[0].SelectedShipMethodID;
      const myShipMethod = shipMethods.findIndex((method) => method.ID == selectedID);
      setShipMethod(shipMethods[myShipMethod]);
    }
    setOrder(myOrder);
    setPayment(orderPayment.Items);
  };

  useEffect(() => {
    if (orderId != undefined) {
      getMyOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const lineItemList =
    order.LineItems && order.LineItems.length ? (
      <>
        <ol className="line-item-list">
          {order.LineItems.map((lineItem) => (
            <li key={lineItem.ID}>
              <LineItemCard lineItem={lineItem} editable={false} />
            </li>
          ))}
        </ol>
      </>
    ) : (
      <h3>No line items</h3>
    );
  const billingAddress =
    order && order.Order && order.Order.BillingAddress ? (
      <>
        <p className="title">Billing Address</p>
        <p>{order?.Order?.BillingAddress?.AddressName}</p>
        <p>{order?.Order?.BillingAddress?.CompanyName}</p>
        <p>{order?.Order?.BillingAddress?.FirstName}</p>
        <p>{order?.Order?.BillingAddress?.LastName}</p>
        <p>{order?.Order?.BillingAddress?.Street1}</p>
        <p>{order?.Order?.BillingAddress?.Street2}</p>
        <p>{order?.Order?.BillingAddress?.City}</p>
        <p>{order?.Order?.BillingAddress?.State}</p>
        <p>{order?.Order?.BillingAddress?.Zip}</p>
        <p>{order?.Order?.BillingAddress?.Country}</p>
        <p>{order?.Order?.BillingAddress?.Phone}</p>
      </>
    ) : (
      <p className="title">No billing address found</p>
    );

  const shippingAddress =
    order.LineItems && order.LineItems.length ? (
      <>
        <p className="title">Shipping Address</p>
        <p>{order.LineItems[0]?.ShippingAddress?.AddressName}</p>
        <p>{order.LineItems[0]?.ShippingAddress?.CompanyName}</p>
        <p>{order.LineItems[0]?.ShippingAddress?.FirstName}</p>
        <p>{order.LineItems[0]?.ShippingAddress?.LastName}</p>
        <p>{order.LineItems[0]?.ShippingAddress?.Street1}</p>
        <p>{order.LineItems[0]?.ShippingAddress?.Street2}</p>
        <p>{order.LineItems[0]?.ShippingAddress?.City}</p>
        <p>{order.LineItems[0]?.ShippingAddress?.State}</p>
        <p>{order.LineItems[0]?.ShippingAddress?.Zip}</p>
        <p>{order.LineItems[0]?.ShippingAddress?.Country}</p>
        <p>{order.LineItems[0]?.ShippingAddress?.Phone}</p>
      </>
    ) : (
      <p className="title">No Shipping Address</p>
    );

  const statusBgClass =
    order?.Order?.Status === 'Completed'
      ? 'bg-orange'
      : order?.Order?.Status === 'Canceled'
      ? 'bg-pink'
      : 'bg-blue-light';

  // Configure return
  return (
    <section className="order-review-details shop-container">
      <p className={`order-status ${statusBgClass}`}>{order?.Order?.Status}</p>
      <h1>{order?.Order?.ID}</h1>
      <p className="order-date">Placed: {getOrderDate(new Date(order?.Order?.DateSubmitted))}</p>
      <div className="grid-container">
        <div className="panel line-items-panel">
          <div className="panel-header">
            <h2>Items</h2>
          </div>
          <div className="panel-body">{lineItemList}</div>
        </div>
        <div>
          <div className="panel">
            <div className="panel-header">
              <h2>Delivery</h2>
            </div>
            <div className="panel-body">
              <p>Delivery type: Standard</p>
              <p>Ship Method: {shipMethod?.Name}</p>
              <p>Estimated Delivery: 1st of April 2022</p>
              {shippingAddress}
            </div>
          </div>
          <div className="panel">
            <div className="panel-header">
              <h2>Payment</h2>
            </div>
            <div className="panel-body">
              <p className="title">Payment method:</p>
              <p>{payment[0]?.Type}</p>
              {billingAddress}
            </div>
          </div>
          <div className="panel">
            <div className="panel-header">
              <h2>Additional comment</h2>
            </div>
            <div className="panel-body">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum adipisci autem
                sapiente, ratione earum labore commodi eligendi perferendis ipsa quam!
              </p>
            </div>
          </div>
          <div className="checkout-summary">
            <p className="summary-line">
              <span className="line-name">Subtotal:</span>
              <span className="line-amount">{formatCurrency(order?.Order?.Subtotal)}</span>
            </p>
            <p
              className={`summary-line ${
                order?.Order?.PromotionDiscount !== 0 ? 'has-discount' : ''
              }`}
            >
              <span className="line-name">Discount:</span>
              <span className="line-amount">{formatCurrency(order?.Order?.PromotionDiscount)}</span>
            </p>
            <p className="summary-line shipping-line">
              <span className="line-name">Delivery fees:</span>
              <span className="line-amount">{formatCurrency(order?.Order?.ShippingCost)}</span>
            </p>
            <p className="summary-line">
              <span className="line-name">Taxes:</span>
              <span className="line-amount">{formatCurrency(order?.Order?.TaxCost)}</span>
            </p>
            <p className="summary-line total-line">
              <span className="line-name">Total:</span>
              <span className="line-amount">{formatCurrency(order?.Order?.Total)}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderHistoryDetails;
