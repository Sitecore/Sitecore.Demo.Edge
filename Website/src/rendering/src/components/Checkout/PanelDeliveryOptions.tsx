const PanelDeliveryOptions = (): JSX.Element => {
  return (
    <div className="panel radio-options">
      <div className="panel-header">
        <h2>Delivery options</h2>
      </div>
      <div className="panel-body">
        <div className="option-item">
          <input
            type="radio"
            name="deliveryOption"
            id="deliveryOptionShip"
            value="ship"
            defaultChecked
          />
          <label htmlFor="deliveryOptionShip">
            <span className="option-name">Delivery</span>
            <span className="option-desc">Ship to an address</span>
          </label>
        </div>
        <div className="option-item">
          <input type="radio" name="deliveryOption" id="deliveryOptionSummit" value="summit" />
          <label htmlFor="deliveryOptionSummit">
            <span className="option-name">Pick up from the Summit</span>
            <span className="option-desc">Pick up your order at the Summit front desk</span>
          </label>
        </div>
        <div className="option-item">
          <input type="radio" name="deliveryOption" id="deliveryOptionStore" value="store" />
          <label htmlFor="deliveryOptionStore">
            <span className="option-name">Pick up from a store</span>
            <span className="option-desc">Pick up your order in-store</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PanelDeliveryOptions;
