import { Address, BuyerCreditCard, OrderWorksheet, ShipMethod } from 'ordercloud-javascript-sdk';
import { formatCurrency } from '../../helpers/CurrencyHelper';
import LineItemCard from '../Checkout/LineItemCard';
import {
  calculateEstimatedDeliveryDate,
  getCreditCardExpirationDate,
  getOrderDate,
} from '../../helpers/DateHelper';
import Head from 'next/head';

interface OrderDetailsContentProps {
  order: OrderWorksheet;
  shipMethod: ShipMethod;
  creditCard: BuyerCreditCard;
}

const OrderDetailsContent = ({
  order,
  shipMethod,
  creditCard,
}: OrderDetailsContentProps): JSX.Element => {
  if (!order?.Order) {
    return <div>This order does not exist.</div>;
  }

  const lineItemList = order.LineItems?.length ? (
    <ol className="line-item-list">
      {order.LineItems.map((lineItem) => (
        <li key={lineItem.ID}>
          <LineItemCard lineItem={lineItem} editable={false} />
        </li>
      ))}
    </ol>
  ) : (
    <p>No products ordered</p>
  );

  const getAddress = (address: Address) => {
    return address ? (
      <>
        <p>
          {order.Order.BillingAddress.FirstName} {order.Order.BillingAddress.LastName}
        </p>
        <p>{order.Order.BillingAddress.Street1}</p>
        <p>{order.Order.BillingAddress.Street2}</p>
        <p>
          {order.Order.BillingAddress.City}, {order.Order.BillingAddress.State},{' '}
          {order.Order.BillingAddress.Zip}
        </p>
        <p>{order.Order.BillingAddress.Country}</p>
      </>
    ) : null;
  };

  const billingAddress = order.Order.BillingAddress ? (
    <>
      <p className="title">Billing Address:</p>
      {getAddress(order.Order.BillingAddress)}
    </>
  ) : (
    <p className="title">No billing address</p>
  );

  const shippingAddress =
    order.LineItems?.length && order.LineItems[0]?.ShippingAddress ? (
      <>
        <p className="title">Shipping Address:</p>
        {getAddress(order.LineItems[0]?.ShippingAddress)}
      </>
    ) : (
      <p className="title">No shipping address</p>
    );

  const statusBgClass =
    order.Order.Status === 'Completed'
      ? 'bg-orange'
      : order.Order.Status === 'Canceled'
      ? 'bg-pink'
      : 'bg-blue-light';

  const commentsPanel = order.Order.Comments && (
    <div className="panel">
      <div className="panel-header">
        <h2>Additional comment</h2>
      </div>
      <div className="panel-body">
        <p>{order.Order.Comments}</p>
      </div>
    </div>
  );

  console.log(creditCard.ExpirationDate);
  return (
    <>
      <Head>
        <title>PLAY! SHOP - Order {order.Order.ID}</title>
      </Head>

      <section className="order-review-details shop-container">
        <p className={`order-status ${statusBgClass}`}>{order.Order.Status}</p>
        <h1>{order.Order.ID}</h1>
        <p className="order-date">Placed: {getOrderDate(new Date(order.Order.DateSubmitted))}</p>
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
                <p>Delivery option: Delivery</p>
                <p>Delivery type: {shipMethod?.Name}</p>
                <p>
                  Estimated Delivery:{' '}
                  {calculateEstimatedDeliveryDate(
                    shipMethod?.EstimatedTransitDays,
                    new Date(order.Order.DateSubmitted)
                  )}
                </p>
                {shippingAddress}
              </div>
            </div>
            <div className="panel">
              <div className="panel-header">
                <h2>Payment</h2>
              </div>
              <div className="panel-body">
                <p className="title">Payment method:</p>
                <p>Name on card: {creditCard.CardholderName}</p>
                <p>Credit card ending in: : •••• {creditCard.PartialAccountNumber}</p>
                <p>Expiration: {getCreditCardExpirationDate(creditCard.ExpirationDate)}</p>
                {billingAddress}
              </div>
            </div>
            {commentsPanel}
            <div className="checkout-summary">
              <p className="summary-line">
                <span className="line-name">Subtotal:</span>
                <span className="line-amount">{formatCurrency(order.Order.Subtotal)}</span>
              </p>
              <p
                className={`summary-line ${
                  order.Order.PromotionDiscount !== 0 ? 'has-discount' : ''
                }`}
              >
                <span className="line-name">Discount:</span>
                <span className="line-amount">{formatCurrency(order.Order.PromotionDiscount)}</span>
              </p>
              <p className="summary-line shipping-line">
                <span className="line-name">Delivery fees:</span>
                <span className="line-amount">{formatCurrency(order.Order.ShippingCost)}</span>
              </p>
              <p className="summary-line">
                <span className="line-name">Taxes:</span>
                <span className="line-amount">{formatCurrency(order.Order.TaxCost)}</span>
              </p>
              <p className="summary-line total-line">
                <span className="line-name">Total:</span>
                <span className="line-amount">{formatCurrency(order.Order.Total)}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetailsContent;
