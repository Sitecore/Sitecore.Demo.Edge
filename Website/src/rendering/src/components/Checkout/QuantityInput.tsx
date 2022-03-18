import { RequiredDeep } from 'ordercloud-javascript-sdk';
import { DPriceSchedule } from '../../models/ordercloud/DPriceSchedule';
import { ChangeEvent, useState } from 'react';

type QuantityInputProps = {
  controlId: string;
  priceSchedule: RequiredDeep<DPriceSchedule>;
  disabled?: boolean;
  quantity: number;
  onChange: (quantity: number) => void;
};

const QuantityInput = (props: QuantityInputProps): JSX.Element => {
  const [quantity, setQuantity] = useState(props.quantity);

  const addDisabled =
    props.disabled ||
    (props.priceSchedule.MaxQuantity ? quantity >= props.priceSchedule.MaxQuantity : false);
  const subtractDisabled =
    props.disabled ||
    (props.priceSchedule.MinQuantity ? quantity < props.priceSchedule.MinQuantity : quantity <= 0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(Number(e.target.value));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    props.onChange(Number(e.target.value));
  };

  const handleSubtract = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    props.onChange(newQuantity);
  };

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    props.onChange(newQuantity);
  };

  const restrictedQuantityInput = props.priceSchedule.RestrictedQuantity && (
    <div className="quantity-input">
      <select
        id={props.controlId}
        disabled={props.disabled}
        value={quantity}
        onChange={handleSelectChange}
      >
        {props.priceSchedule.PriceBreaks.map((priceBreak) => (
          <option key={priceBreak.Quantity} value={priceBreak.Quantity}>
            {priceBreak.Quantity}
          </option>
        ))}
      </select>
    </div>
  );

  const unrestrictedQuantityInput = !props.priceSchedule.RestrictedQuantity && (
    <div className="quantity-input">
      <button
        className="quantity-input-button"
        aria-label="Subtract quantity"
        type="button"
        disabled={subtractDisabled}
        onClick={handleSubtract}
      >
        -
      </button>
      <input
        id={props.controlId}
        disabled={props.disabled}
        type="number"
        min={props.priceSchedule.MinQuantity}
        max={props.priceSchedule.MaxQuantity}
        step={1}
        value={props.quantity}
        onChange={handleInputChange}
      />
      <button
        className="quantity-input-button"
        aria-label="Add quantity"
        type="button"
        disabled={addDisabled}
        onClick={handleAdd}
      >
        +
      </button>
    </div>
  );

  return (
    <>
      {restrictedQuantityInput}
      {unrestrictedQuantityInput}
    </>
  );
};
export default QuantityInput;
