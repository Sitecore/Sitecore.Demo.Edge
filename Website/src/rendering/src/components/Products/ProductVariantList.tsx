import { RequiredDeep, Variant } from 'ordercloud-javascript-sdk';
import { FunctionComponent } from 'react';

interface ProductVariantListProps {
  variants?: RequiredDeep<Variant>[];
  variantID?: string;
  onChange: (variantID: string) => void;
}

const ProductVariantList: FunctionComponent<ProductVariantListProps> = ({
  variants,
  variantID,
  onChange,
}): JSX.Element => {
  const variantList =
    variants && !variantID ? (
      <div>
        Variants:
        <div className="product-variants">
          <ul>
            {variants?.map((variant, index) => (
              <li key={index}>
                <button onClick={() => onChange(variant.ID)}>{variant.Name}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ) : null;

  // Configure return
  return variantList;
};

export default ProductVariantList;
