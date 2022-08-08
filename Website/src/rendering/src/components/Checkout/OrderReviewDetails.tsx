import { useRouter } from 'next/router';
import { Actions, PageController } from '@sitecore-discover/react';
import { submitOrder } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import CheckoutSummary from './CheckoutSummary';
import LineItemList from './LineItemList';
import { logOrderCheckout } from '../../services/CdpService';
import mapProductsForDiscover from '../../helpers/discover/ProductMapper';
import mapUserForDiscover from '../../helpers/discover/UserMapper';
import {
  calculateEstimatedDeliveryDate,
  getCreditCardExpirationDate,
} from '../../helpers/DateHelper';

const OrderReviewDetails = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { order, lineItems, shipEstimateResponse, shippingAddress, payments } = useOcCurrentCart();

  const shipEstimate = shipEstimateResponse?.ShipEstimates?.[0];
  const deliveryMethod = shipEstimate?.ShipMethods?.filter(
    (method) => method.ID === shipEstimate.SelectedShipMethodID
  )?.[0];

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
        <p>{shippingAddress?.Street2}</p>
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
        <p>Credit card ending in: •••• {payments?.[0]?.xp?.CreditCard?.PartialAccountNumber}</p>
        <p>
          Expires on: {getCreditCardExpirationDate(payments?.[0]?.xp?.CreditCard?.ExpirationDate)}
        </p>
      </div>
      <div>
        <p className="title">Billing address:</p>
        <p>
          {order?.BillingAddress?.FirstName} {order?.BillingAddress?.LastName}
        </p>
        <p>{order?.BillingAddress?.Street1}</p>
        <p>{order?.BillingAddress?.Street2}</p>
        <p>
          {order?.BillingAddress?.City}, {order?.BillingAddress?.State},{' '}
          {order?.BillingAddress?.Zip}
        </p>
        <p>{order?.BillingAddress?.Country}</p>
      </div>
    </>
  );

  const commentsPanelContent = order?.Comments && (
    <div className="panel">
      <div className="panel-header">
        <h2>Additional Comments</h2>
      </div>
      <div className="panel-body">{order?.Comments}</div>
    </div>
  );

  const onOrderSubmitSuccess = () => {
    dispatchDiscoverOrderConfirmEvent();
    dispatchCdpOrderCheckoutEvent();
    router?.push(`/shop/checkout/order-summary`);
  };

  const dispatchDiscoverOrderConfirmEvent = () => {
    PageController.getDispatcher().dispatch({
      type: Actions.ORDER_CONFIRM,
      payload: {
        products: mapProductsForDiscover(lineItems),
        user: mapUserForDiscover(order.FromUser),
        orderId: order.ID,
        total: order.Total,
        subtotal: order.Subtotal,
      },
    });
  };

  const dispatchCdpOrderCheckoutEvent = () => {
    logOrderCheckout(order, lineItems, payments);
  };

  const handleSubmitOrder = async () => dispatch(submitOrder(onOrderSubmitSuccess));

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
          {commentsPanelContent}
          <CheckoutSummary buttonText="Place your order" onClick={handleSubmitOrder} />
        </div>
      </div>
    </div>
  );
};

export default OrderReviewDetails;
