import { RequiredDeep, Spec } from 'ordercloud-javascript-sdk';
import { ChangeEvent, FunctionComponent } from 'react';

interface ProductSpecFieldProps {
  spec: RequiredDeep<Spec>;
  optionId?: string;
  value?: string;
  onChange: (values: { SpecID: string; OptionID?: string; Value?: string }) => void;
}

const ProductSpecField: FunctionComponent<ProductSpecFieldProps> = ({
  spec,
  optionId,
  value,
  onChange,
}) => {
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

  return (
    <div>
      <label htmlFor={spec.ID}>
        {spec.Name}
        {spec.OptionCount ? (
          <select id={spec.ID} name={spec.ID} onChange={handleSelectChange} value={optionId || ''}>
            {spec.AllowOpenText && <option value="OpenText">Write in option</option>}
            {spec.Options.map((o) => (
              <option key={o.ID} value={o.ID}>
                {o.Value}
              </option>
            ))}
          </select>
        ) : (
          <input id={spec.ID} onChange={handleInputChange} value={value || ''} />
        )}
      </label>
    </div>
  );
};

export default ProductSpecField;
