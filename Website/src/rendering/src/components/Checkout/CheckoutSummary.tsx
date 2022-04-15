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
  const { order, shipEstimateResponse, shippingAddress, payments } = useOcCurrentOrder();
  const shipEstimate = shipEstimateResponse?.ShipEstimates?.length
    ? shipEstimateResponse.ShipEstimates[0]
    : null;
  const selectedShipMethodId = shipEstimate?.SelectedShipMethodID;

  const onOrderSubmitSuccess = () => {
    router?.push?.(`/shop/checkout/order-summary`);
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
      return 'FREE';
    } else {
      return formatCurrency(order.ShippingCost);
    }
  };

  const canSubmitOrder = (): boolean => {
    if (loading) {
      return false;
    }
    if (!order.ID) {
      return false;
    }
    if (!selectedShipMethodId) {
      return false;
    }
    if (!shippingAddress?.Country) {
      return false;
    }
    if (!order.BillingAddress?.Country) {
      return false;
    }
    if (!payments?.length || !payments[0] || !payments[0].ID || !payments[0].Accepted) {
      return false;
    }
    return true;
  };

  const summary = order && (
    <>
      <p className="summary-line">
        <span className="line-name">Subtotal:</span>
        <span className="line-amount">{formatCurrency(order.Subtotal)}</span>
      </p>
      <p className="summary-line">
        <span className="line-name">Discount:</span>
        <span className="line-amount">{formatCurrency(order.PromotionDiscount)}</span>
      </p>
      <p className="summary-line shipping-line">
        <span className="line-name">Delivery fees:</span>
        <span className="line-amount">{getShippingMessage()}</span>
      </p>
      <p className="summary-line">
        <span className="line-name">Taxes:</span>
        <span className="line-amount">{formatCurrency(order.TaxCost)}</span>
      </p>
      <p className="summary-line total-line">
        <span className="line-name">Total:</span>
        <span className="line-amount">{formatCurrency(order.Total)}</span>
      </p>
      <button
        className="btn--main btn--main--round"
        disabled={!canSubmitOrder()}
        onClick={handleSubmitOrder}
      >
        Place your order
      </button>
    </>
  );

  return <div className="checkout-summary">{summary}</div>;
};

export default CheckoutSummary;
