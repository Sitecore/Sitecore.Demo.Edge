import { useEffect, useState } from 'react';
import { LineItem, LineItems, Order, Orders } from 'ordercloud-javascript-sdk';
import { useRouter } from 'next/router';
import { formatCurrency } from 'src/helpers/CurrencyHelper';

const OrderHistoryDetails = (): JSX.Element => {
  const [order, setOrder] = useState<Order>({});
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const router = useRouter();
  const orderId = router?.query?.order?.length > 0 ? router.query.order : undefined;

  const getMyOrder = async () => {
    const myOrder = await Orders.Get<Order>('All', orderId.toString());
    const myLineItems = await LineItems.List('All', orderId.toString());
    setOrder(myOrder);
    setLineItems(myLineItems.Items);
  };

  useEffect(() => {
    if (orderId != undefined) {
      getMyOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const lineItemList = lineItems && (
    <table>
      <tr>
        <th>Product ID</th>
        <th>Quantity</th>
        <th>Line Total</th>
      </tr>
      {lineItems.map((lineItem, key) => {
        return (
          <tr key={key}>
            <td>{lineItem?.Product?.ID}</td>
            <td>{lineItem?.Quantity}</td>
            <td>{formatCurrency(lineItem?.LineTotal)}</td>
          </tr>
        );
      })}
    </table>
  );

  // Configure return
  return (
    <section className="section">
      <div className="shop-container">
        <div className="order-history-details">
          <p>ID: {order?.ID}</p>
          <p>DateSubmitted: {order?.DateSubmitted}</p>
          <p>
            From User: {order?.FromUser?.FirstName} {order?.FromUser?.LastName}
          </p>
          <p>Subtotal: {formatCurrency(order?.Subtotal)}</p>
          <p>ShippingCost: {formatCurrency(order?.ShippingCost)}</p>
          <p>TaxCost: {formatCurrency(order?.TaxCost)}</p>
          <p>Total: {formatCurrency(order?.Total)}</p>
        </div>
        {lineItemList}
      </div>
    </section>
  );
};

export default OrderHistoryDetails;
