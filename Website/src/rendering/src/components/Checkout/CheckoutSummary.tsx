import { useRouter } from 'next/router';
import { useState } from 'react';
import { patchOrder, submitOrder } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';
import { formatCurrency } from '../../helpers/CurrencyHelper';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import { getItemsCount } from '../../helpers/LineItemsHelpers';

type CheckoutSummaryProps = {
  orderComments?: string;
};
const CheckoutSummary = (props: CheckoutSummaryProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { order, shipEstimateResponse, shippingAddress, payments, lineItems } = useOcCurrentOrder();
  const shipEstimate = shipEstimateResponse?.ShipEstimates?.length
    ? shipEstimateResponse.ShipEstimates[0]
    : null;
  const selectedShipMethodId = shipEstimate?.SelectedShipMethodID;

  const onOrderSubmitSuccess = () => {
    router?.push?.(`/shop/checkout/order-summary`);
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    if (props.orderComments) {
      await dispatch(patchOrder({ Comments: props.orderComments }));
    }
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

  const numberOfItems =
    order && `${getItemsCount(lineItems)} item${getItemsCount(lineItems) > 1 ? 's' : ''}`;

  const subtotal = order && (
    <>
      <p className="summary-line subtotal-line">
        <span className="line-name">Cart ({numberOfItems}):</span>
        <span className="line-amount">{formatCurrency(order.Subtotal)}</span>
      </p>
      <p className="summary-line shipping-line">
        <span className="line-name">Shipping &amp; Handling:</span>
        <span className="line-amount">{getShippingMessage()}</span>
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

  return <div className="checkout-summary">{subtotal}</div>;
};

export default CheckoutSummary;
