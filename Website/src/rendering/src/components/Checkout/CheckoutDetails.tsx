import PanelDeliveryOptions from './PanelDeliveryOptions';
import PanelShippingAddress from './PanelShippingAddress';
import PanelShippingEstimates from './PanelShippingEstimates';
import PanelBillingAddress from './PanelBillingAddress';
import PanelPayment from './PanelPayment';
import PanelComments from './PanelComments';
import CheckoutSummary from './CheckoutSummary';
import { useState } from 'react';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';

const CheckoutDetails = (): JSX.Element => {
  const { order } = useOcCurrentCart();
  const [comments, setComments] = useState('');
  const handleEditComments = (updatedComments: string) => {
    setComments(updatedComments);
  };
  const shippingEstimates = order?.xp?.DeliveryType === 'Ship' && <PanelShippingEstimates />;

  const checkoutDetails = order?.LineItemCount > 0 && (
    <section className="checkout-details shop-container section">
      <PanelDeliveryOptions />
      <PanelShippingAddress />
      {shippingEstimates}
      <PanelBillingAddress />
      <PanelPayment />
      <div>
        <PanelComments orderComments={comments} onEditComments={handleEditComments} />
        <CheckoutSummary orderComments={comments} />
      </div>
    </section>
  );

  return <>{checkoutDetails}</>;
};

export default CheckoutDetails;
