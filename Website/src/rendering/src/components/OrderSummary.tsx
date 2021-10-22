import { TICKETS } from '../models/mock-tickets';

const OrderSummary = (): JSX.Element => {
  const ticketId =
    typeof window === 'undefined'
      ? '0'
      : new URLSearchParams(window.location.search).get('ticket') || '0';
  const ticket = TICKETS[parseInt(ticketId)];

  const ticketPass = ticket.pass ? <div>x 1 {ticket.pass}</div> : undefined;

  // The empty div in the else clause is required. Without it, the class="line-item total-line" of the total line is not rendered to the DOM for unknown reasons.
  const fees =
    ticket.fees > 0 ? (
      <div>
        <div className="line-item">
          <div className="item-name">Fees</div>
          <div className="item-price">${ticket.fees}.00</div>
        </div>
        <div>x 1 Service Charge</div>
      </div>
    ) : (
      <div></div>
    );

  return (
    <div className="order-summary">
      <div className="summary-header">Order Summary</div>
      <div className="summary-content">
        <div className="details">Details</div>
        <div>
          <div className="line-item">
            <div className="item-name">{ticket.name}</div>
            <div className="item-price">${ticket.price}.00</div>
          </div>
          {ticketPass}
        </div>
        {fees}
        <div className="line-item total-line">
          <div>Total</div>
          <div>${ticket.price + ticket.fees}.00</div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
