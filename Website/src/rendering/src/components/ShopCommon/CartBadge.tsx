import { getItemsCount } from '../../helpers/LineItemsHelpers';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';

const CartBadge = (): JSX.Element => {
  const { lineItems } = useOcCurrentCart();
  const badgeCount = lineItems ? getItemsCount(lineItems) : 0;

  return <div className="cart-badge">{badgeCount}</div>;
};

export default CartBadge;
