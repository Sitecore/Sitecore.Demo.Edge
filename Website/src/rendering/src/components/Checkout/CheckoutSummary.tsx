import { formatCurrency } from '../../helpers/CurrencyHelper';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';

const CheckoutSummary = (): JSX.Element => {
  const { order, shipEstimateResponse } = useOcCurrentOrder();
  // TODO: ordercloud supports multiple ship estimates, at this time we are
  // only returning a single set of ship estimates to keep it simple
  // expect to add a set of ship estimates by supplier in the future
  const shipEstimate = shipEstimateResponse?.ShipEstimates?.length
    ? shipEstimateResponse.ShipEstimates[0]
    : null;
  const selectedShipMethodId = shipEstimate?.SelectedShipMethodID;
  const getShippingMessage = () => {
    if (!selectedShipMethodId) {
      return 'N/A';
    } else if (order.ShippingCost === 0) {
      return 'Free';
    } else {
      return formatCurrency(order.ShippingCost);
    }
  };
  const subtotal = order && (
    <div>
      <p>
        Cart ({order.LineItemCount} items): {formatCurrency(order.Subtotal)}
      </p>
      <p>Shipping & Handling: {getShippingMessage()}</p>
    </div>
  );
  return <div className="checkout-summary">{subtotal}</div>;
};

export default CheckoutSummary;
