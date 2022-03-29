const PanelDeliveryOptions = (): JSX.Element => {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Delivery options</h2>
      </div>
      <div className="panel-body">
        <div>
          <input
            type="radio"
            name="deliveryOption"
            id="deliveryOptionShip"
            value="ship"
            defaultChecked
          />
          <label htmlFor="deliveryOptionShip">
            <span>Delivery</span>
            <br />
            <span>Ship to an address</span>
          </label>
        </div>
        <div>
          <input type="radio" name="deliveryOption" id="deliveryOptionSummit" value="summit" />
          <label htmlFor="deliveryOptionSummit">
            <span>Pick up from the Summit</span>
            <br />
            <span>Pick up your order at the Summit front desk</span>
          </label>
        </div>
        <div>
          <input type="radio" name="deliveryOption" id="deliveryOptionStore" value="store" />
          <label htmlFor="deliveryOptionStore">
            <span>Pick up from a store</span>
            <br />
            <span>Pick up your order in-store</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PanelDeliveryOptions;
