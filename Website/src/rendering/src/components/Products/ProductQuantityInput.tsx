import { PriceSchedule, RequiredDeep } from 'ordercloud-javascript-sdk';
import { ChangeEvent, useState } from 'react';

interface ProductQuantityInputProps {
  priceSchedule: RequiredDeep<PriceSchedule>;
  label?: string;
  disabled?: boolean;
  quantity: number;
  onChange: (quantity: number) => void;
}

const ProductQuantityInput = ({
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
    (priceSchedule.MinQuantity
      ? _quantity <= priceSchedule.MinQuantity && _quantity <= 1
      : _quantity <= 1);

  const isInRange = (q: number) => {
    let _isInRange = q >= 1;

    if (priceSchedule.MinQuantity) {
      _isInRange = _isInRange && q >= priceSchedule.MinQuantity;
    }

    if (priceSchedule.MaxQuantity) {
      _isInRange = _isInRange && q <= priceSchedule.MaxQuantity;
    }

    return _isInRange;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _val = Number(e.target.value);
    if (isInRange(_val)) {
      setQuantity(_val);
      onChange(_val);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const _val = Number(e.target.value);
    if (isInRange(_val)) {
      setQuantity(_val);
      onChange(_val);
    }
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

  const quantityForm = priceSchedule.RestrictedQuantity ? (
    <select disabled={disabled} value={_quantity} onChange={handleSelectChange}>
      {priceSchedule.PriceBreaks.map((priceBreak) => (
        <option key={priceBreak.Quantity} value={priceBreak.Quantity}>
          {priceBreak.Quantity}
        </option>
      ))}
    </select>
  ) : (
    <>
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
    </>
  );

  return <div className="quantity-input">{quantityForm}</div>;
};

export default ProductQuantityInput;
