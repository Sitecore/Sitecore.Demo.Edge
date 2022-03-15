import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';

const CartSummary = (): JSX.Element => {
  const { order } = useOcCurrentOrder();
  const subtotal = order && (
    <p>
      Subtotal ({order.LineItemCount} items): <span>${order.Subtotal}</span>
    </p>
  );
  return <div className="cart-summary">{subtotal}</div>;
};

export default CartSummary;
