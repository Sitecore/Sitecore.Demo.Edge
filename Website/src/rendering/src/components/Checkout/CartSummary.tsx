import useOcCurrentOrder from 'src/hooks/useOcCurrentOrder';

const CartSummary = (): JSX.Element => {
  const { order } = useOcCurrentOrder();
  return (
    <div className="cart-summary">
      <p>
        Subtotal ({order.LineItemCount} items): ${order.Subtotal}
      </p>
    </div>
  );
};

export default CartSummary;
