import { RequiredDeep } from 'ordercloud-javascript-sdk';
import { DPriceSchedule } from '../../models/ordercloud/DPriceSchedule';
import { ChangeEvent, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

type QuantityInputProps = {
  controlId: string;
  priceSchedule: RequiredDeep<DPriceSchedule>;
  loading?: boolean;
  quantity: number;
  onChange: (quantity: number) => void;
};

const QuantityInput = (props: QuantityInputProps): JSX.Element => {
  const [quantity, setQuantity] = useState(props.quantity);

  const addDisabled =
    props.loading ||
    (props.priceSchedule.MaxQuantity ? quantity >= props.priceSchedule.MaxQuantity : false);
  const subtractDisabled =
    props.loading ||
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
        disabled={props.loading}
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
        disabled={props.loading}
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

  const quantityInput = props.loading ? (
    <div className="quantity-input">
      <button
        className="quantity-input-button"
        aria-label="Subtract quantity"
        type="button"
        disabled={true}
      >
        -
      </button>
      <Skeleton containerClassName="skeleton-container" height="100%" />
      <button
        className="quantity-input-button"
        aria-label="Add quantity"
        type="button"
        disabled={true}
      >
        +
      </button>
    </div>
  ) : (
    <>
      {restrictedQuantityInput}
      {unrestrictedQuantityInput}
    </>
  );

  return quantityInput;
};
export default QuantityInput;
