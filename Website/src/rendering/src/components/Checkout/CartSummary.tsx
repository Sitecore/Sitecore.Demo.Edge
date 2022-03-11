import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';

const CartSummary = (): JSX.Element => {
  const { order } = useOcCurrentOrder();
  const subtotal = order && (
    <p>
      Subtotal ({order.LineItemCount} items): <strong>${order.Subtotal}</strong>
    </p>
  );
  return <div className="cart-summary">{subtotal}</div>;
};

export default CartSummary;
