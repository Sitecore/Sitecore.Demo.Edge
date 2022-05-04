import CartSummary from './CartSummary';
import LineItemList from './LineItemList';
import PromoInput from './PromoInput';
import Link from 'next/link';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';

const CartDetails = (): JSX.Element => {
  const { order } = useOcCurrentOrder();
  const cartDetailsActions = order?.LineItemCount > 0 && (
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

  return (
    <div className="cart-details container">
      <h1>Shopping cart</h1>
      <div className="cart-details-grid">
        <div className="cart-details-items">
          <LineItemList editable={true} />
        </div>
        {cartDetailsActions}
      </div>
    </div>
  );
};

export default CartDetails;
