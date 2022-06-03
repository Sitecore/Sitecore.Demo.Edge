import { useState } from 'react';
import { formatCurrency } from '../../helpers/CurrencyHelper';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import useOcAuth from '../../hooks/useOcAuth';

type CheckoutSummaryProps = {
  buttonText: string;
  onClick: () => Promise<unknown>;
};

const CheckoutSummary = (props: CheckoutSummaryProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { order, shipEstimateResponse, shippingAddress, payments } = useOcCurrentCart();
  const { isAnonymous } = useOcAuth();

  const shipEstimate = shipEstimateResponse?.ShipEstimates?.length
    ? shipEstimateResponse.ShipEstimates[0]
    : null;
  const selectedShipMethodId = shipEstimate?.SelectedShipMethodID;

  const handleButtonClick = async () => {
    setLoading(true);
    await props.onClick();
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

  const isShipOrder = order?.xp?.DeliveryType === 'Ship';

  const canSubmitOrder = (): boolean => {
    if (loading) {
      return false;
    }
    if (!order?.ID) {
      return false;
    }
    if (isShipOrder && !selectedShipMethodId) {
      return false;
    }
    if (!shippingAddress?.Country) {
      return false;
    }
    if (!order?.BillingAddress?.Country) {
      return false;
    }
    if (!payments?.length || !payments[0] || !payments[0].ID || !payments[0].Accepted) {
      return false;
    }
    if (isAnonymous && order?.FromUser?.Email === 'test@test.com') {
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
      <p className={`summary-line ${order.PromotionDiscount !== 0 ? 'has-discount' : ''}`}>
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
        onClick={handleButtonClick}
      >
        {props.buttonText}
      </button>
    </>
  );

  return <div className="checkout-summary">{summary}</div>;
};

export default CheckoutSummary;
