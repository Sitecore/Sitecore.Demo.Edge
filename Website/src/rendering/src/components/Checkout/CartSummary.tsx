import Skeleton from 'react-loading-skeleton';
import { formatCurrency } from '../../helpers/CurrencyHelper';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';

const CartSummary = (): JSX.Element => {
  const { order, orderTotalLoading } = useOcCurrentCart();
  const subtotal = order?.LineItemCount && (
    <p>
      Subtotal ({order.LineItemCount} items): <span>{formatCurrency(order.Subtotal)}</span>
    </p>
  );

  const content = orderTotalLoading ? (
    <Skeleton containerClassName="skeleton-container" height={40} />
  ) : (
    <div className="cart-summary">{subtotal}</div>
  );

  return content;
};

export default CartSummary;
