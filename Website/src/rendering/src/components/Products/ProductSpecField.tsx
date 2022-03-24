import { RequiredDeep, Spec } from 'ordercloud-javascript-sdk';
import { ChangeEvent } from 'react';

interface OrderCloudSpecFieldProps {
  spec: RequiredDeep<Spec>;
  optionId?: string;
  value?: string;
  onChange: (values: { SpecID: string; OptionID?: string; Value?: string }) => void;
}

const ProductSpecField = ({
  spec,
  optionId,
  value,
  onChange,
}: OrderCloudSpecFieldProps): JSX.Element => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({
      SpecID: spec.ID,
      OptionID: e.target.value ? e.target.value : undefined,
      Value: undefined,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      SpecID: spec.ID,
      OptionID: 'OpenText',
      Value: e.target.value.length ? e.target.value : undefined,
    });
  };

  const specField = spec.OptionCount ? (
    <select id={spec.ID} name={spec.ID} onChange={handleSelectChange} value={optionId || ''}>
      {spec.AllowOpenText && <option value="OpenText">Write in option</option>}
      {spec.Options.map((option) => (
        <option key={option.ID} value={option.ID}>
          {option.Value}
        </option>
      ))}
    </select>
  ) : (
    <input id={spec.ID} onChange={handleInputChange} value={value || ''} />
  );

  return (
    <div>
      <label htmlFor={spec.ID}>
        {spec.Name}
        {specField}
      </label>
    </div>
  );
};

export default ProductSpecField;
