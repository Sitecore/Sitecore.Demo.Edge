import { RequiredDeep, Spec } from 'ordercloud-javascript-sdk';
import { FunctionComponent } from 'react';
import ProductSpecField from './ProductSpecField';

type OrderCloudSpec = {
  SpecID: string;
  OptionID?: string;
  Value?: string;
};

interface ProductSpecsInputProps {
  specs: RequiredDeep<Spec>[];
  specValues: OrderCloudSpec[];
  onChange: (values: OrderCloudSpec) => void;
}

const ProductSpecList: FunctionComponent<ProductSpecsInputProps> = ({
  specs,
  specValues,
  onChange,
}): JSX.Element => {
  const productSpecs = specs ? (
    <div>
      Specs:
      <div className="product-specs">
        {specs?.map((spec: RequiredDeep<Spec>) => {
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
    </div>
  ) : null;

  return productSpecs;
};

export default ProductSpecList;
