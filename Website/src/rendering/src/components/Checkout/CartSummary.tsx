import Skeleton from 'react-loading-skeleton';
import { getItemsCount } from '../../helpers/LineItemsHelpers';
import { formatCurrency } from '../../helpers/CurrencyHelper';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';

const CartSummary = (): JSX.Element => {
  const { lineItems, order, orderTotalLoading } = useOcCurrentCart();
  const subtotal = order?.LineItemCount && (
    <p>
      Subtotal ({getItemsCount(lineItems)} items): <span>{formatCurrency(order.Subtotal)}</span>
    </p>
  );

  const content = orderTotalLoading ? (
    <Skeleton containerClassName="skeleton-container" height={45} />
  ) : (
    <div className="cart-summary">{subtotal}</div>
  );

  return content;
};

export default CartSummary;
