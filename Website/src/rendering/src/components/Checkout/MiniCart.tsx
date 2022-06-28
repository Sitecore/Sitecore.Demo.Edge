import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { DLineItem } from '../../models/ordercloud/DLineItem';
import Link from 'next/link';
import MiniCartItem from './MiniCartItem';
import { getItemsCount } from '../../helpers/LineItemsHelpers';
import useOcAuth from '../../hooks/useOcAuth';

type MinicartProps = {
  onNavigatingAway: () => void;
};

const MiniCart = ({ onNavigatingAway }: MinicartProps): JSX.Element => {
  const { lineItems, order } = useOcCurrentCart();
  const { isAnonymous, isAuthenticated } = useOcAuth();

  const nextStepLink =
    !isAnonymous && isAuthenticated ? '/shop/checkout/checkout' : '/shop/checkout/anonymous';

  const cartContent =
    lineItems && lineItems.length ? (
      <>
        <ol className="mini-cart-list">
          {lineItems.map((lineItem: DLineItem) => (
            <MiniCartItem key={lineItem.ID} lineItem={lineItem} />
          ))}
        </ol>
        <div className="mini-cart-footer">
          <p className="mini-cart-subtotal">
            <span>Subtotal ({getItemsCount(lineItems)} items):</span>
            <span> ${order.Subtotal}</span>
          </p>
          <div className="mini-cart-buttons">
            <Link href="/shop/checkout/cart">
              <a className="btn-secondary-light" onClick={onNavigatingAway}>
                View full cart
              </a>
            </Link>
            <Link href={nextStepLink}>
              <a className="btn-main" onClick={onNavigatingAway}>
                Proceed to checkout
              </a>
            </Link>
          </div>
        </div>
      </>
    ) : (
      <h3>Cart is empty</h3>
    );

  return <div className="mini-cart">{cartContent}</div>;
};

export default MiniCart;
