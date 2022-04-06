import CartSummary from './CartSummary';
import LineItemList from './LineItemList';
import PromoInput from './PromoInput';
import Link from 'next/link';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import Skeleton from 'react-loading-skeleton';

type CartDetailsProps = {
  editable?: boolean;
};

const CartDetails = (props: CartDetailsProps): JSX.Element => {
  const { order, initialized } = useOcCurrentCart();

  const getCardDetailsAction = () => {
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
              <a className="btn--main btn--main--round">Proceed to Checkout</a>
            </Link>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="cart-details container">
      <h1>Shopping cart</h1>
      <div className="cart-details-grid">
        <div className="cart-details-items">
          <LineItemList editable={props.editable} />
        </div>
        {getCardDetailsAction()}
      </div>
    </div>
  );
};

export default CartDetails;
