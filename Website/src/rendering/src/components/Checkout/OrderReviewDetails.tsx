import useOcCurrentOrder from 'src/hooks/useOcCurrentOrder';
import CheckoutSummary from './CheckoutSummary';
import LineItemList from './LineItemList';

const OrderReviewDetails = (): JSX.Element => {
  const { order, shipEstimateResponse, shippingAddress } = useOcCurrentOrder();
  console.log({ order, shipEstimateResponse, shippingAddress });

  const shipEstimate = shipEstimateResponse?.ShipEstimates?.[0];
  const deliveryMethod = shipEstimate?.ShipMethods?.filter(
    (method) => method.ID === shipEstimate.SelectedShipMethodID
  )?.[0];

  const calculateEstimatedDelivery = (days: number): string => {
    const eta = new Date();
    eta.setDate(eta.getDate() + days);
    return eta.toLocaleDateString();
  };

  return (
    <div className="order-review-details shop-container">
      <h1>Order review</h1>
      <div className="grid-container">
        <div className="panel">
          <div className="panel-header">
            <h2>Items</h2>
          </div>
          <div className="panel-body">
            <LineItemList editable={false} />
          </div>
        </div>
        <div className="panel">
          <div className="panel-header">
            <h2>Delivery</h2>
          </div>
          <div className="panel-body">
            <p>Delivery type: {deliveryMethod?.Name}</p>
            <p>
              Estimated delivery: {calculateEstimatedDelivery(deliveryMethod?.EstimatedTransitDays)}
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
            <div>
              <p className="title">Your comment:</p>
              <p>{order?.Comments}</p>
            </div>
          </div>
        </div>
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default OrderReviewDetails;
