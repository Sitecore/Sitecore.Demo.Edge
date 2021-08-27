import OrderSummary from './OrderSummary';
import PaymentAndBillingForm from './PaymentAndBillingForm';

const PaymentForm = (): JSX.Element => (
  <div className="payment-form">
    <div className="payment-form-order-summary">
      <OrderSummary />
    </div>
    <div className="payment-form-payment">
      <PaymentAndBillingForm />
    </div>
  </div>
);

export default PaymentForm;
