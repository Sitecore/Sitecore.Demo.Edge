import { RequiredDeep, ShipMethodSelection } from 'ordercloud-javascript-sdk';
import { ChangeEvent, useState } from 'react';
import { formatCurrency } from '../../helpers/CurrencyHelper';
import { DShipMethod } from '../../models/ordercloud/DShipMethod';

type ShipMethodsListProps = {
  shipMethods?: DShipMethod[];
  shipEstimateId?: string;
  selectedShipMethodId?: string;
  onChange?: (shipMethod: RequiredDeep<ShipMethodSelection>) => void;
  loading?: boolean;
};

const ShipMethodsList = (props: ShipMethodsListProps): JSX.Element => {
  const [selectedMethodId, setSelectedMethodId] = useState(props.selectedShipMethodId || '');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const shipMethodId = event.target.value;
    setSelectedMethodId(shipMethodId);
    const shipMethod = props.shipMethods.find((shipMethod) => shipMethod.ID === shipMethodId);

    if (props.onChange) {
      props.onChange({
        ShipEstimateID: props.shipEstimateId,
        ShipMethodID: shipMethod.ID,
      });
    }
  };

  const radioButtons =
    props.shipMethods?.length &&
    props.shipMethods.map((shipMethod) => (
      <div key={shipMethod.ID} className="option-item">
        <input
          id={shipMethod.ID}
          type="radio"
          value={shipMethod.ID}
          checked={shipMethod.ID === selectedMethodId}
          name="selected-ship-method"
          disabled={props.loading}
          onChange={handleChange}
        />
        <label htmlFor={shipMethod.ID}>
          <span className="option-name">
            {shipMethod.Name} - {formatCurrency(shipMethod.Cost)}
          </span>
          <span className="option-desc">{shipMethod.xp?.Description}</span>
        </label>
      </div>
    ));

  return <div className="shipmethods-list">{radioButtons}</div>;
};

export default ShipMethodsList;
