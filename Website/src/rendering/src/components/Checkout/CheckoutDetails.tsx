import PanelShippingAddress from './PanelShippingAddress';
import PanelShippingEstimates from './PanelShippingEstimates';
import PanelBillingAddress from './PanelBillingAddress';
import PanelPayment from './PanelPayment';
import PanelComments from './PanelComments';
import CheckoutSummary from './CheckoutSummary';

const CheckoutDetails = (): JSX.Element => (
  <div>
    <PanelShippingAddress />
    <PanelShippingEstimates />
    <PanelBillingAddress />
    <PanelPayment />
    <PanelComments />
    <CheckoutSummary />
  </div>
);

export default CheckoutDetails;
