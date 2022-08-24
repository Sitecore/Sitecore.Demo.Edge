import CartSummary from './CartSummary';
import LineItemList from './LineItemList';
import PromoInput from './PromoInput';
import Link from 'next/link';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import Spinner from '../../components/ShopCommon/Spinner';
import useOcAuth from '../../hooks/useOcAuth';

const CartDetails = (): JSX.Element => {
  const { order, initialized } = useOcCurrentCart();
  const { isAnonymous, isAuthenticated } = useOcAuth();
  const [loading, setLoading] = useState(false);

  const nextStepLink =
    !isAnonymous && isAuthenticated ? '/shop/checkout/checkout' : '/shop/checkout/anonymous';

  const getCartDetailsAction = () => {
    if (!initialized) {
      return (
        // TODO: Refactor to avoid HTML repetition
        <div className="cart-details-actions">
          <div className="cart-details-actions-wrapper">
            <Skeleton containerClassName="skeleton-container" height={163} />
          </div>
        </div>
      );
    } else if (order?.LineItemCount) {
      return (
        <div className="cart-details-actions">
          <div className="cart-details-actions-wrapper">
            <CartSummary />
            <PromoInput />
            <Link href={nextStepLink}>
              <a className="btn-main" onClick={() => setLoading(true)}>
                <Spinner loading={loading} /> Proceed to Checkout
              </a>
            </Link>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="cart-details shop-container">
      <h1>Shopping cart</h1>
      <div className="cart-details-grid">
        <div className="cart-details-items">
          <LineItemList editable={true} />
        </div>
        {getCartDetailsAction()}
      </div>
    </div>
  );
};

export default CartDetails;
