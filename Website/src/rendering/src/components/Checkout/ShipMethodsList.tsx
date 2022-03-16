import { RequiredDeep, ShipMethodSelection } from 'ordercloud-javascript-sdk';
import { ChangeEvent } from 'react';
import { DShipMethod } from 'src/models/ordercloud/DShipMethod';

type ShipMethodsListProps = {
  shipMethods?: DShipMethod[];
  shipEstimateId?: string;
  selectedShipMethodId?: string;
  onChange?: (shipMethod: RequiredDeep<ShipMethodSelection>) => void;
};

const ShipMethodsList = (props: ShipMethodsListProps): JSX.Element => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const shipMethodId = event.target.value;
    const shipMethod = props.shipMethods.find((shipMethod) => shipMethod.ID === shipMethodId);
    if (props.onChange && typeof props.onChange === 'function') {
      props.onChange({
        ShipEstimateID: props.shipEstimateId,
        ShipMethodID: shipMethod.ID,
      });
    }
  };
  const radioButtons =
    props.shipMethods?.length &&
    props.shipMethods.map((shipMethod) => (
      <div key={shipMethod.ID}>
        <input
          id={shipMethod.ID}
          type="radio"
          value={shipMethod.ID}
          checked={props.selectedShipMethodId === shipMethod.ID}
          name="selected-ship-method"
          onChange={handleChange}
        />
        <label htmlFor={shipMethod.ID}>
          <strong>{shipMethod.Name}</strong>
          <span>{shipMethod.Cost}</span>
          <span>{shipMethod.xp?.Description}</span>
        </label>
      </div>
    ));
  return <div className="shipmethods-list">{radioButtons}</div>;
};

export default ShipMethodsList;
