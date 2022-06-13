import { useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import PanelDeliveryOptions from './PanelDeliveryOptions';
import PanelShippingAddress from './PanelShippingAddress';
import PanelShippingEstimates from './PanelShippingEstimates';
import PanelBillingAddress from './PanelBillingAddress';
import PanelPayment from './PanelPayment';
import PanelComments from './PanelComments';
import PanelUserDetails from './PanelUserDetails';
import CheckoutSummary from './CheckoutSummary';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import useOcAuth from '../../hooks/useOcAuth';
import { getGuestEmail, identifyVisitor } from '../../services/CdpService';
import { useAppDispatch } from '../../redux/store';
import { updateUser } from '../../redux/ocUser';

const CheckoutDetailsSkeleton = (): JSX.Element => {
  const skeletonCount = 5;
  const skeletonArray = new Array(skeletonCount).fill('');
  return (
    // TODO: Refactor to avoid HTML repetition
    <section className="checkout-details shop-container section">
      {skeletonArray.map((_, index) => (
        <Skeleton key={index} height={605} />
      ))}
    </section>
  );
};

const CheckoutDetails = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { order, initialized } = useOcCurrentCart();
  const { isAnonymous } = useOcAuth();

  const getOrderFromUserEmail = () =>
    order?.FromUser?.Email && order.FromUser.Email !== 'test@test.com' ? order.FromUser.Email : '';

  const [userEmail, setUserEmail] = useState(getOrderFromUserEmail());

  const setEmail = useCallback(
    (email: string) => {
      dispatch(updateUser({ Email: email }));
      setUserEmail(email);
    },
    [dispatch]
  );

  // If the visitor is anonymous and is known in CDP, update the user email
  useEffect(() => {
    const getEmail = async () => {
      const email = await getGuestEmail();
      if (email) {
        console.log(email);
        setEmail(email);
      }
    };

    if (isAnonymous) {
      getEmail();
    }
  }, [isAnonymous, setEmail]);

  const handleReviewOrderClick = () => {
    identifyVisitor(order.FromUser.Email);
    return router?.push('/shop/checkout/order-review');
  };

  const checkoutTitle = isAnonymous ? 'Guest checkout' : 'Checkout';
  const userDetailsPanel = isAnonymous && (
    <PanelUserDetails email={userEmail} setOrderEmail={setEmail} />
  );
  const shippingEstimates = order?.xp?.DeliveryType === 'Ship' && <PanelShippingEstimates />;

  const checkoutDetails = (
    <section className="checkout-details shop-container">
      <h1>{checkoutTitle}</h1>
      <div className="checkout-details-grid">
        {userDetailsPanel}
        <PanelDeliveryOptions />
        <PanelShippingAddress />
        {shippingEstimates}
        <PanelBillingAddress />
        <PanelPayment />
        <div className="panel-comments-summary">
          <PanelComments />
          <CheckoutSummary buttonText="Review order" onClick={handleReviewOrderClick} />
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
