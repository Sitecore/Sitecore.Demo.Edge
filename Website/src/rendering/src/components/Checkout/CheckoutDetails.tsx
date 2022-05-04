import Link from 'next/link';
import PanelDeliveryOptions from './PanelDeliveryOptions';
import PanelShippingAddress from './PanelShippingAddress';
import PanelShippingEstimates from './PanelShippingEstimates';
import PanelBillingAddress from './PanelBillingAddress';
import PanelPayment from './PanelPayment';
import PanelComments from './PanelComments';

const CheckoutDetails = (): JSX.Element => {
  return (
    <section className="checkout-details shop-container">
      <h1>Checkout</h1>
      <div className="checkout-details-grid">
        <PanelDeliveryOptions />
        <PanelShippingAddress />
        <PanelShippingEstimates />
        <PanelBillingAddress />
        <PanelPayment />
        <div>
          <PanelComments />
          <Link href="/shop/checkout/order-review">
            <a className="btn--main btn--main--round review-order-btn">Review order</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CheckoutDetails;
