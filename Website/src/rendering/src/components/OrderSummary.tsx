const OrderSummary = (): JSX.Element => (
  <div className="order-summary">
    <div className="summary-header">Order Summary</div>
    <div className="summary-content">
      <div className="details">Details</div>
      <div>
        <div className="line-item">
          <div className="item-name">Regular Ticket</div>
          <div className="item-price">$199.00</div>
        </div>
        <div>x 1 Regular Event Pass</div>
      </div>
      <div>
        <div className="line-item">
          <div className="item-name">Fees</div>
          <div className="item-price">$7.00</div>
        </div>
        <div>x 1 Service Charge</div>
      </div>
      <div className="line-item total-line">
        <div>Total</div>
        <div>$206.00</div>
      </div>
    </div>
  </div>
);

export default OrderSummary;
