import PanelDeliveryOptions from './PanelDeliveryOptions';
import PanelShippingAddress from './PanelShippingAddress';
import PanelShippingEstimates from './PanelShippingEstimates';
import PanelBillingAddress from './PanelBillingAddress';
import PanelPayment from './PanelPayment';
import PanelComments from './PanelComments';
import CheckoutSummary from './CheckoutSummary';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';

const CheckoutDetailsSkeleton = (): JSX.Element => {
  const skeletonCount = 5;
  const skeletonArray = new Array(skeletonCount).fill('');
  return (
    <section className="checkout-details shop-container section">
      {skeletonArray.map((_, index) => (
        <Skeleton key={index} height={605} />
      ))}
    </section>
  );
};

const CheckoutDetails = (): JSX.Element => {
  const { order, initialized } = useOcCurrentCart();
  const shippingEstimates = order?.xp?.DeliveryType === 'Ship' && <PanelShippingEstimates />;

  const checkoutDetails = (
    <section className="checkout-details shop-container">
      <h1>Checkout</h1>
      <div className="checkout-details-grid">
        <PanelDeliveryOptions />
        <PanelShippingAddress />
        {shippingEstimates}
        <PanelBillingAddress />
        <PanelPayment />
        <div>
          <PanelComments />
          <CheckoutSummary />
        </div>
      </div>
    </section>
  );

  const getContent = () => {
    if (!initialized) {
      return <CheckoutDetailsSkeleton />;
    } else if (!order?.LineItemCount) {
      return (
        <section className="shop-container section">
          <p>It doesn&apos;t look like you have any items in your cart</p>
          <p>
            <Link href="/shop">
              <a className="btn--main btn--main--round continue-shopping-btn">Continue Shopping</a>
            </Link>
          </p>
        </section>
      );
    } else {
      return checkoutDetails;
    }
  };

  return getContent();
};

export default CheckoutDetails;
