import { PriceSchedule, RequiredDeep } from 'ordercloud-javascript-sdk';
import { ChangeEvent, FocusEvent, useState } from 'react';

interface QuantityInputProps {
  controlId: string;
  priceSchedule: RequiredDeep<PriceSchedule>;
  label?: string;
  disabled?: boolean;
  initialQuantity: number | string;
  onChange: (quantity: number) => void;
}

const QuantityInput = ({
  controlId,
  priceSchedule,
  disabled,
  initialQuantity,
  onChange,
}: QuantityInputProps): JSX.Element => {
  const [editedQuantity, setEditedQuantity] = useState(initialQuantity);

  const addDisabled =
    disabled || (priceSchedule.MaxQuantity ? editedQuantity >= priceSchedule.MaxQuantity : false);
  const subtractDisabled =
    disabled ||
    (priceSchedule.MinQuantity
      ? editedQuantity <= priceSchedule.MinQuantity && editedQuantity <= 1
      : editedQuantity <= 1);

  const isInRange = (quantity: number) => {
    let isInRange = quantity >= 1;

    if (priceSchedule.MinQuantity) {
      isInRange = isInRange && quantity >= priceSchedule.MinQuantity;
    }

    if (priceSchedule.MaxQuantity) {
      isInRange = isInRange && quantity <= priceSchedule.MaxQuantity;
    }

    return isInRange;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputQuantity = Number(e.target.value);
    if (isInRange(inputQuantity)) {
      setEditedQuantity(inputQuantity);
      onChange(inputQuantity);
    } else if (e.target.value === '') {
      setEditedQuantity('');
    }
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setEditedQuantity(priceSchedule.MinQuantity ? priceSchedule.MinQuantity : 1);
      onChange(priceSchedule.MinQuantity ? priceSchedule.MinQuantity : 1);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedQuantity = Number(e.target.value);
    if (isInRange(selectedQuantity)) {
      setEditedQuantity(selectedQuantity);
      onChange(selectedQuantity);
    }
  };

  const handleSubtract = () => {
    const newQuantity = Number(editedQuantity) - 1;
    setEditedQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleAdd = () => {
    const newQuantity = Number(editedQuantity) + 1;
    setEditedQuantity(newQuantity);
    onChange(newQuantity);
  };

  const quantityForm = priceSchedule.RestrictedQuantity ? (
    <select id={controlId} disabled={disabled} value={editedQuantity} onChange={handleSelectChange}>
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
        value={editedQuantity}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
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

export default QuantityInput;
