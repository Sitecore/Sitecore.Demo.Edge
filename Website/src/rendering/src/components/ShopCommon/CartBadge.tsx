import { getItemsCount } from '../../helpers/LineItemsHelpers';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';

const CartBadge = (): JSX.Element => {
  const { lineItems } = useOcCurrentCart();

  return lineItems ? <div className="cart-badge">{getItemsCount(lineItems)}</div> : <></>;
};

export default CartBadge;
