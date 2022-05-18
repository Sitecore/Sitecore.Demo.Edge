import PanelDeliveryOptions from './PanelDeliveryOptions';
import PanelShippingAddress from './PanelShippingAddress';
import PanelShippingEstimates from './PanelShippingEstimates';
import PanelBillingAddress from './PanelBillingAddress';
import PanelPayment from './PanelPayment';
import PanelComments from './PanelComments';
import CheckoutSummary from './CheckoutSummary';

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
          <CheckoutSummary />
        </div>
      </div>
    </section>
  );
};

export default CheckoutDetails;
