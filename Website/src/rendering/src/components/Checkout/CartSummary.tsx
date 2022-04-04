import { formatCurrency } from '../../helpers/CurrencyHelper';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';

const CartSummary = (): JSX.Element => {
  const { order } = useOcCurrentCart();
  const subtotal = order?.LineItemCount && (
    <p>
      Subtotal ({order.LineItemCount} items): <span>{formatCurrency(order.Subtotal)}</span>
    </p>
  );

  return <div className="cart-summary">{subtotal}</div>;
};

export default CartSummary;
