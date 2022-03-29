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

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      SpecID: spec.ID,
      OptionID: e.target.value ? e.target.value : undefined,
      Value: undefined,
    });
  };

  const specType = spec.Name.toLowerCase();

  // TODO: Find a better way to get spec types and info for them
  // TODO: Find a better way to order size options
  // TODO: Display unavailable options as disabled
  const specField = spec.OptionCount ? (
    <>
      {spec.AllowOpenText ? (
        <select id={spec.ID} name={spec.ID} onChange={handleSelectChange} value={optionId || ''}>
          <option value="OpenText">Write in option</option>
          {spec.Options.map((option) => (
            <option key={option.ID} value={option.ID}>
              {option.Value}
            </option>
          ))}
        </select>
      ) : (
        spec.Options.map((option) => (
          <>
            <input
              type="radio"
              key={`i${option.ID}`}
              id={option.ID}
              name={spec.ID}
              value={option.ID}
              onChange={handleRadioChange}
              checked={optionId === option.ID}
              className={specType === 'color' ? option.Value.toLowerCase() : ''}
            />
            <label htmlFor={option.ID} key={`l${option.ID}`}>
              <span>{specType === 'size' ? option.Value.substring(0, 1) : option.Value}</span>
            </label>
          </>
        ))
      )}
    </>
  ) : (
    <input id={spec.ID} onChange={handleInputChange} value={value || ''} />
  );

  return (
    // TODO: Free text input spec field hidden for now - do we need it?
    !!spec.OptionCount && (
      <div className="spec-item" data-type={specType}>
        <span className="spec-name">{spec.Name}</span>
        <label htmlFor={spec.ID}>{specField}</label>
      </div>
    )
  );
};

export default ProductSpecField;
