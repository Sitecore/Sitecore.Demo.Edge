import { PriceSchedule, RequiredDeep } from 'ordercloud-javascript-sdk';
import { ChangeEvent, FocusEvent, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

interface QuantityInputProps {
  controlId: string;
  priceSchedule: RequiredDeep<PriceSchedule>;
  label?: string;
  loading?: boolean;
  initialQuantity: number | string;
  onChange: (quantity: number) => void;
}

const QuantityInput = ({
  controlId,
  priceSchedule,
  loading,
  initialQuantity,
  onChange,
}: QuantityInputProps): JSX.Element => {
  const [editedQuantity, setEditedQuantity] = useState(initialQuantity);

  const addDisabled =
    loading || (priceSchedule.MaxQuantity ? editedQuantity >= priceSchedule.MaxQuantity : false);
  const subtractDisabled =
    loading ||
    (priceSchedule.MinQuantity
      ? editedQuantity <= priceSchedule.MinQuantity && editedQuantity <= 1
      : editedQuantity <= 1);

  const isInRange = (quantity: number) => {
    let isInRange = quantity >= 1;

    if (priceSchedule?.MinQuantity) {
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

  // selected from restricted quantities such as business cards that come in 100, 200, 250, etc.
  // TODO: add skeleton loading indicator
  const restrictedQuantityInput = loading ? (
    <Skeleton containerClassName="skeleton-container" height="100%" />
  ) : (
    <select id={controlId} value={editedQuantity} onChange={handleSelectChange}>
      {priceSchedule.PriceBreaks.map((priceBreak) => (
        <option key={priceBreak.Quantity} value={priceBreak.Quantity}>
          {priceBreak.Quantity}
        </option>
      ))}
    </select>
  );

  // unrestricted in the sense that there is no predetermined set of quantities but there may still be min or max set at priceschedule level
  // TODO: add loading indicator
  // TODO: Refactor to avoid HTML repetition
  const quantityInput = loading ? (
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
        disabled={loading}
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

  const quantityForm = priceSchedule?.RestrictedQuantity ? restrictedQuantityInput : quantityInput;

  return <div className="quantity-input">{quantityForm}</div>;
};

export default QuantityInput;
