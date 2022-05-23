import { getItemsCount } from '../../helpers/LineItemsHelpers';
import { formatCurrency } from '../../helpers/CurrencyHelper';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';

const CartSummary = (): JSX.Element => {
  const { lineItems, order } = useOcCurrentOrder();
  const subtotal = order?.LineItemCount && (
    <p>
      Subtotal ({getItemsCount(lineItems)} items): <span>{formatCurrency(order.Subtotal)}</span>
    </p>
  );

  return <div className="cart-summary">{subtotal}</div>;
};

export default CartSummary;
