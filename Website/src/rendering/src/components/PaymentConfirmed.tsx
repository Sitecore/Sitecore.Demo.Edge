import OrderSummary from './OrderSummary';
import TicketPaymentConfirmed from './TicketPaymentConfirmed';

const PaymentConfirmed = (): JSX.Element => (
  <div className="payment-confirmed-page">
    <TicketPaymentConfirmed />
    <OrderSummary />
  </div>
);

export default PaymentConfirmed;
