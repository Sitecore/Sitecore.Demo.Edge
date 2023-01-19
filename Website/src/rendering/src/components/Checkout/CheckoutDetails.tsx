import { useEffect, useCallback, useState } from 'react';
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
import NoItemsInCartMessage from '../ShopCommon/NoItemsInCartMessage';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import useOcAuth from '../../hooks/useOcAuth';
import { getGuestEmail } from '../../services/CdpService';
import { identifyVisitor } from '../../services/IdentificationService';
import { useAppDispatch } from '../../redux/store';
import { updateUser } from '../../redux/ocUser';
import { patchOrder } from '../../redux/ocCurrentCart';
import { DeliveryTypes } from '../../models/ordercloud/DOrder';

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

  const [userEmail, setUserEmail] = useState('');

  const setEmail = useCallback(
    (email: string) => {
      // Update the user email and patch the order
      dispatch(updateUser({ Email: email }));
      dispatch(patchOrder({ FromUser: { Email: email } }));
      setUserEmail(email);
    },
    [dispatch]
  );

  // If the visitor is anonymous and is known in CDP, update the user email
  useEffect(() => {
    const getEmail = async () => {
      const email = await getGuestEmail();
      if (email) {
        setEmail(email);
      }
    };

    if (isAnonymous) {
      getEmail();
    }
  }, [isAnonymous, setEmail]);

  const handleReviewOrderClick = () => {
    identifyVisitor(isAnonymous ? userEmail : order.FromUser.Email);
    return router?.push('/shop/checkout/order-review');
  };

  const shouldEnableButton = () => !isAnonymous || !!userEmail;

  const checkoutTitle = isAnonymous ? 'Guest checkout' : 'Checkout';
  const userDetailsPanel = isAnonymous && (
    <PanelUserDetails email={userEmail} setOrderEmail={setEmail} />
  );
  const shippingEstimates = order?.xp?.DeliveryType === DeliveryTypes.Ship && (
    <PanelShippingEstimates />
  );

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
          <CheckoutSummary
            buttonText="Review order"
            onClick={handleReviewOrderClick}
            shouldEnableButton={shouldEnableButton}
          />
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
          <NoItemsInCartMessage />
        </section>
      );
    } else {
      return checkoutDetails;
    }
  };

  return getContent();
};

export default CheckoutDetails;
