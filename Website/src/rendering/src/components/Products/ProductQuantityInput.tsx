import { PriceSchedule, RequiredDeep } from 'ordercloud-javascript-sdk';
import { ChangeEvent, useState } from 'react';

interface ProductQuantityInputProps {
  controlId: string;
  priceSchedule: RequiredDeep<PriceSchedule>;
  label?: string;
  disabled?: boolean;
  quantity: number;
  onChange: (quantity: number) => void;
}

const ProductQuantityInput = ({
  controlId,
  priceSchedule,
  disabled,
  quantity,
  onChange,
}: ProductQuantityInputProps): JSX.Element => {
  const [_quantity, setQuantity] = useState(quantity);

  const addDisabled =
    disabled || (priceSchedule.MaxQuantity ? _quantity >= priceSchedule.MaxQuantity : false);
  const subtractDisabled =
    disabled ||
    (priceSchedule.MinQuantity ? _quantity < priceSchedule.MinQuantity : _quantity <= 0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  const handleSubtract = () => {
    const newQuantity = _quantity - 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleAdd = () => {
    const newQuantity = _quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const priceForm = priceSchedule.RestrictedQuantity ? (
    <div className="quantity-input">
      <select id={controlId} disabled={disabled} value={_quantity} onChange={handleSelectChange}>
        {priceSchedule.PriceBreaks.map((priceBreak) => (
          <option key={priceBreak.Quantity} value={priceBreak.Quantity}>
            {priceBreak.Quantity}
          </option>
        ))}
      </select>
    </div>
  ) : (
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
        id={controlId}
        disabled={disabled}
        type="number"
        min={priceSchedule.MinQuantity}
        max={priceSchedule.MaxQuantity}
        step={1}
        value={_quantity}
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

  return <label htmlFor={controlId}>{priceForm}</label>;
};

export default ProductQuantityInput;
