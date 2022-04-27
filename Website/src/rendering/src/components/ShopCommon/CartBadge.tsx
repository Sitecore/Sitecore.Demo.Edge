import { getItemsCount } from '../../helpers/LineItemsHelpers';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';

const CartBadge = (): JSX.Element => {
  const { lineItems } = useOcCurrentOrder();

  return lineItems ? <div className="cart-badge">{getItemsCount(lineItems)}</div> : <></>;
};

export default CartBadge;
