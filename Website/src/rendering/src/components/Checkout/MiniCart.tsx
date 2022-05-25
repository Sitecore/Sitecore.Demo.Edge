import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { DLineItem } from '../../models/ordercloud/DLineItem';
import Link from 'next/link';
import MiniCartItem from './MiniCartItem';
import { getItemsCount } from '../../helpers/LineItemsHelpers';

const MiniCart = (): JSX.Element => {
  const { lineItems, order } = useOcCurrentCart();

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
              <a className="btn--secondary btn--secondary--light btn--secondary--round">
                View full cart
              </a>
            </Link>
            <Link href="/shop/checkout/checkout">
              <a className="btn--main btn--main--round">Proceed to checkout</a>
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
