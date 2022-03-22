import { PriceSchedule, RequiredDeep } from 'ordercloud-javascript-sdk';
import { ChangeEvent, FunctionComponent } from 'react';

interface ProductQuantityInputProps {
  controlId: string;
  priceSchedule: RequiredDeep<PriceSchedule>;
  label?: string;
  disabled?: boolean;
  quantity: number;
  onChange: (quantity: number) => void;
}

const ProductQuantityInput: FunctionComponent<ProductQuantityInputProps> = ({
  controlId,
  priceSchedule,
  label = 'Quantity',
  disabled,
  quantity,
  onChange,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  const priceForm = priceSchedule.RestrictedQuantity ? (
    // eslint-disable-next-line
    <select id={controlId} disabled={disabled} value={quantity} onChange={handleSelectChange}>
      {priceSchedule.PriceBreaks.map((pb) => (
        <option key={pb.Quantity} value={pb.Quantity}>
          {pb.Quantity}
        </option>
      ))}
    </select>
  ) : (
    <input
      id={controlId}
      disabled={disabled}
      type="number"
      min={priceSchedule.MinQuantity}
      max={priceSchedule.MaxQuantity}
      step={1}
      value={quantity}
      onChange={handleInputChange}
    />
  );

  return (
    <label htmlFor={controlId}>
      {label}
      {priceForm}
    </label>
  );
};

export default ProductQuantityInput;
