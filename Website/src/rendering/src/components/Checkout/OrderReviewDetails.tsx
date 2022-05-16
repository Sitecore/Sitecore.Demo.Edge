import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import CheckoutSummary from './CheckoutSummary';
import LineItemList from './LineItemList';

const OrderReviewDetails = (): JSX.Element => {
  const { order, shipEstimateResponse, shippingAddress, payments } = useOcCurrentOrder();

  const shipEstimate = shipEstimateResponse?.ShipEstimates?.[0];
  const deliveryMethod = shipEstimate?.ShipMethods?.filter(
    (method) => method.ID === shipEstimate.SelectedShipMethodID
  )?.[0];

  const calculateEstimatedDeliveryDate = (days: number): string => {
    const eta = new Date();
    eta.setDate(eta.getDate() + days);
    return eta.toLocaleDateString();
  };

  const deliveryPanelContent = (
    <>
      <p>Delivery type: {deliveryMethod?.Name}</p>
      <p>
        Estimated delivery: {calculateEstimatedDeliveryDate(deliveryMethod?.EstimatedTransitDays)}
      </p>
      <div>
        <p className="title">Shipping address:</p>
        <p>
          {shippingAddress?.FirstName} {shippingAddress?.LastName}
        </p>
        <p>{shippingAddress?.Street1}</p>
        <p>
          {shippingAddress?.City}, {shippingAddress?.State}, {shippingAddress?.Zip}
        </p>
        <p>{shippingAddress?.Country}</p>
      </div>
    </>
  );

  const paymentPanelContent = (
    <>
      <div>
        <p className="title payment-title">Payment method:</p>
        <p>Name on card: {payments?.[0]?.xp?.CreditCard?.CardholderName}</p>
        <p>Credit card ending in: {payments?.[0]?.xp?.CreditCard?.ID}</p>
        <p>Expires on: {payments?.[0]?.xp?.CreditCard?.ExpirationDate}</p>
      </div>
      <div>
        <p className="title">Billing address:</p>
        <p>
          {order?.BillingAddress?.FirstName} {order?.BillingAddress?.LastName}
        </p>
        <p>{order?.BillingAddress?.Street1}</p>
        <p>
          {order?.BillingAddress?.City}, {order?.BillingAddress?.State},{' '}
          {order?.BillingAddress?.Zip}
        </p>
        <p>{order?.BillingAddress?.Country}</p>
      </div>
    </>
  );

  return (
    <div className="order-review-details shop-container">
      <h1>Order review</h1>
      <div className="grid-container">
        <div className="panel line-items-panel">
          <div className="panel-header">
            <h2>Items</h2>
          </div>
          <div className="panel-body">
            <LineItemList editable={false} />
          </div>
        </div>
        <div>
          <div className="panel">
            <div className="panel-header">
              <h2>Delivery</h2>
            </div>
            <div className="panel-body">{deliveryPanelContent}</div>
          </div>
          <div className="panel">
            <div className="panel-header">
              <h2>Payment</h2>
            </div>
            <div className="panel-body">{paymentPanelContent}</div>
          </div>
          <div className="panel">
            <div className="panel-header">
              <h2>Additional Comments</h2>
            </div>
            <div className="panel-body">{order?.Comments}</div>
          </div>
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

export default OrderReviewDetails;
