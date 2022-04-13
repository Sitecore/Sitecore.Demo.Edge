import PanelDeliveryOptions from './PanelDeliveryOptions';
import PanelShippingAddress from './PanelShippingAddress';
import PanelShippingEstimates from './PanelShippingEstimates';
import PanelBillingAddress from './PanelBillingAddress';
import PanelPayment from './PanelPayment';
import PanelComments from './PanelComments';
import { useState } from 'react';
import Link from 'next/link';

const CheckoutDetails = (): JSX.Element => {
  const [comments, setComments] = useState('');
  const handleEditComments = (updatedComments: string) => {
    setComments(updatedComments);
  };

  return (
    <section className="checkout-details shop-container section">
      <PanelDeliveryOptions />
      <PanelShippingAddress />
      <PanelShippingEstimates />
      <PanelBillingAddress />
      <PanelPayment />
      <div>
        <PanelComments orderComments={comments} onEditComments={handleEditComments} />
        <Link href="/shop/checkout/order-review">
          <a className="btn--main btn--main--round review-order-btn">Review order</a>
        </Link>
      </div>
    </section>
  );
};

export default CheckoutDetails;
