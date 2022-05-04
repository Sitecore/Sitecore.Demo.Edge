import { useEffect, useState } from 'react';
import {
  IntegrationEvents,
  LineItem,
  LineItems,
  OrderWorksheet,
  Payment,
  Payments,
  ShipMethod,
} from 'ordercloud-javascript-sdk';
import { useRouter } from 'next/router';
import { formatCurrency } from 'src/helpers/CurrencyHelper';
import LineItemCard from 'components/Checkout/LineItemCard';

const OrderHistoryDetails = (): JSX.Element => {
  const [order, setOrder] = useState<OrderWorksheet>({});
  const [payment, setPayment] = useState<Payment[]>([]);
  const [shipMethod, setShipMethod] = useState<ShipMethod>({});
  const router = useRouter();
  const orderId = router?.query?.order?.length > 0 ? router.query.order : undefined;

  const getMyOrder = async () => {
    const myOrder = await IntegrationEvents.GetWorksheet<OrderWorksheet>('All', orderId.toString());
    const orderPayment = await Payments.List('All', orderId.toString());
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
        <h3>Billing Address</h3>
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
      <h3>No billing address found</h3>
    );

  const shippingAddress =
    order.LineItems && order.LineItems.length ? (
      <>
        <h3>Shipping Address</h3>
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
      <h3>No line items</h3>
    );

  // Configure return
  return (
    <section className="section">
      <div className="shop-container">
        <div className="order-history-details">
          <p>ID: {order?.Order?.ID}</p>
          <p>DateSubmitted: {order?.Order?.DateSubmitted}</p>
          <p>Status: {order?.Order?.Status}</p>
          <p>Payment: {payment[0]?.Type}</p>
          <p>
            From User: {order?.Order?.FromUser?.FirstName} {order?.Order?.FromUser?.LastName}
          </p>
          {billingAddress}
          {shippingAddress}
          <p>Subtotal: {formatCurrency(order?.Order?.Subtotal)}</p>
          <p>Ship Method: {shipMethod?.Name}</p>
          <p>Shipping Cost: {formatCurrency(order?.Order?.ShippingCost)}</p>
          <p>TaxCost: {formatCurrency(order?.Order?.TaxCost)}</p>
          <p>Discount: {formatCurrency(order?.Order?.PromotionDiscount)}</p>
          <p>Total: {formatCurrency(order?.Order?.Total)}</p>
        </div>
        {lineItemList}
      </div>
    </section>
  );
};

export default OrderHistoryDetails;
