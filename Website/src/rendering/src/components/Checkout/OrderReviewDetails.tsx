import CheckoutSummary from './CheckoutSummary';
import useOcCurrentOrder from 'src/hooks/useOcCurrentOrder';
import CheckoutSummary from './CheckoutSummary';
import LineItemList from './LineItemList';

const OrderReviewDetails = (): JSX.Element => {
  const { order } = useOcCurrentOrder();
  return (
    <section className="order-review-details shop-container section">
      <div className="order-review-details container">
        <h1>Order review</h1>
        <div className="panel-header">
          <h2>Items</h2>
        </div>
        <div className="order-review-details-grid">
          <div className="order-review-details-items">
            <LineItemList editable={false} />
          </div>
        </div>
      </div>

      <CheckoutSummary />
    </section>
  );
};

export default OrderReviewDetails;
