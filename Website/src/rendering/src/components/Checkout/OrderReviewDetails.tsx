import CheckoutSummary from './CheckoutSummary';
import useOcCurrentOrder from 'src/hooks/useOcCurrentOrder';
const OrderReviewDetails = (): JSX.Element => {
  const { order } = useOcCurrentOrder();
  return (
    <section className="order-review-details shop-container section">
      <CheckoutSummary />
    </section>
  );
};

export default OrderReviewDetails;
