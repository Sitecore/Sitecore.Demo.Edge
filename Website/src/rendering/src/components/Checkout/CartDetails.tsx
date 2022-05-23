import CartSummary from './CartSummary';
import LineItemList from './LineItemList';
import PromoInput from './PromoInput';
import Link from 'next/link';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import Spinner from '../../components/ShopCommon/Spinner';

const CartDetails = (): JSX.Element => {
  const { order, initialized } = useOcCurrentCart();
  const [loading, setLoading] = useState(false);

  const getCartDetailsAction = () => {
    if (!initialized) {
      return (
        <div className="card-details-actions">
          <div className="card-details-actions-wrapper">
            <Skeleton containerClassName="skeleton-container" width={400} height={163} />
          </div>
        </div>
      );
    } else if (order?.LineItemCount) {
      return (
        <div className="cart-details-actions">
          <div className="cart-details-actions-wrapper">
            <CartSummary />
            <PromoInput />
            <Link href="/shop/checkout/checkout">
              <a className="btn--main btn--main--round" onClick={() => setLoading(true)}>
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
