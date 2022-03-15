import CartSummary from './CartSummary';
import LineItemList from './LineItemList';
import PromoInput from './PromoInput';
import Link from 'next/link';

type CartDetailsProps = {
  editable?: boolean;
};

const CartDetails = (props: CartDetailsProps): JSX.Element => (
  <div className="cart-details container">
    <h1>Shopping cart</h1>
    <div className="cart-details-grid">
      <div className="cart-details-items">
        <LineItemList editable={props.editable} />
      </div>
      <div className="cart-details-actions">
        <div className="cart-details-actions-wrapper">
          <CartSummary />
          <PromoInput />
          <button className="btn--main btn--main--round">
            <Link href="/shop/checkout/quick-checkout">Proceed to Checkout</Link>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CartDetails;
