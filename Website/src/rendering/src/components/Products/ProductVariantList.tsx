import Link from 'next/link';
import { RequiredDeep, Variant } from 'ordercloud-javascript-sdk';

interface ProductVariantListProps {
  sku: string;
  productNameSlug: string;
  variants?: RequiredDeep<Variant>[];
}

const ProductVariantList = ({
  sku,
  productNameSlug,
  variants,
}: ProductVariantListProps): JSX.Element => {
  const variantList = variants && (
    <div>
      Variants:
      <div className="product-variants">
        <ul>
          {variants.map((variant, index) => (
            <li key={index}>
              <Link href={`/shop/products/${sku}/${productNameSlug}/${variant.ID}`}>
                <a>{variant.Name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return variantList;
};

export default ProductVariantList;
