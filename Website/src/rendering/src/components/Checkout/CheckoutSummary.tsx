import { useRouter } from 'next/router';
import { useState } from 'react';
import { submitOrder } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';
import { formatCurrency } from '../../helpers/CurrencyHelper';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';

const CheckoutSummary = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { order, shipEstimateResponse } = useOcCurrentOrder();
  const shipEstimate = shipEstimateResponse?.ShipEstimates?.length
    ? shipEstimateResponse.ShipEstimates[0]
    : null;
  const selectedShipMethodId = shipEstimate?.SelectedShipMethodID;

  const onOrderSubmitSuccess = (orderID: string) => {
    router?.push?.(`/checkout/order-summary/${orderID}`);
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    await dispatch(submitOrder(onOrderSubmitSuccess));
    setLoading(false);
  };

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
      <button disabled={!order.ID || loading} onClick={handleSubmitOrder}>
        Place your order
      </button>
    </div>
  );
  return <div className="checkout-summary">{subtotal}</div>;
};

export default CheckoutSummary;
