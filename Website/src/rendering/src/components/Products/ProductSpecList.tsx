import { RequiredDeep, Spec } from 'ordercloud-javascript-sdk';
import ProductSpecField from './ProductSpecField';

export type OrderCloudSpec = {
  SpecID: string;
  OptionID?: string;
  Value?: string;
};

interface ProductSpecsInputProps {
  specs: RequiredDeep<Spec>[];
  specValues: OrderCloudSpec[];
  onChange: (values: OrderCloudSpec) => void;
}

const ProductSpecList = ({ specs, specValues, onChange }: ProductSpecsInputProps): JSX.Element => {
  const productSpecs = specs && (
    <div className="product-specs">
      {specs.map((spec: RequiredDeep<Spec>) => {
        const specValue = specValues.find(
          (specValue: OrderCloudSpec) => specValue.SpecID === spec.ID
        );
        return (
          <ProductSpecField
            key={spec.ID}
            spec={spec}
            onChange={onChange}
            optionId={specValue && specValue.OptionID}
            value={specValue && specValue.Value}
          />
        );
      })}
    </div>
  );

  return productSpecs || <></>;
};

export default ProductSpecList;
