import { BuyerProduct, RequiredDeep, Spec, Variant } from 'ordercloud-javascript-sdk';
import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from 'react';
import { createLineItem } from '../../redux/ocCurrentCart';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import ProductQuantityInput from './ProductQuantityInput';
import ProductSpecList from './ProductSpecList';
import ProductVariantList from './ProductVariantList';
import { Product } from './Shop';

interface ProductDetailsContentProps {
  sku?: string;
  productName?: string;
  variantID?: string;
  product: RequiredDeep<BuyerProduct>;
  specs: RequiredDeep<Spec>[];
  variants: RequiredDeep<Variant>[];
  similarProducts?: DiscoverProduct[];
  moreProducts?: DiscoverProduct[];
}

type DiscoverProduct = {
  name: string;
  price: number;
  image_url: string;
  brand: string;
  sku: string;
};

type OrderCloudSpec = {
  SpecID: string;
  OptionID?: string;
  Value?: string;
};

const ProductDetailsContent: FunctionComponent<ProductDetailsContentProps> = ({
  sku,
  productName,
  variantID,
  product,
  specs,
  variants,
  similarProducts,
  moreProducts,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [specValues, setSpecValues] = useState<OrderCloudSpec[]>([]);

  const [variant, setVariant] = useState<Variant>(undefined);

  // Handle LineItem edits
  const lineItemId = '';
  const lineItem = useAppSelector((s) =>
    lineItemId && s.ocCurrentCart.lineItems
      ? s.ocCurrentCart.lineItems.find((li) => li.ID === lineItemId)
      : undefined
  );
  const [quantity, setQuantity] = useState(
    lineItem ? lineItem.Quantity : (product && product.PriceSchedule.MinQuantity) || 1
  );

  const determineDefaultOptionId = (spec: Spec) => {
    if (spec.DefaultOptionID) return spec.DefaultOptionID;
    return spec.OptionCount ? spec.Options[0].ID : undefined;
  };

  // Set the spec values on inital load
  useEffect(() => {
    let specVals: OrderCloudSpec[] = [];
    if (lineItem) {
      setSpecValues(lineItem.Specs);
    } else {
      if (specs) {
        specVals = specs.map((s) => {
          return {
            SpecID: s.ID,
            OptionID: determineDefaultOptionId(s),
            Value: s.DefaultValue ? s.DefaultValue : undefined,
          };
        });
      }
      if (variants) {
        if (variantID && variants && variant == undefined) {
          const tempVariant = variants.find((listedvariant) => listedvariant.ID == variantID);
          specVals = specVals.map((s) => {
            const variantSpec = tempVariant.Specs.find((spec) => spec.SpecID == s.SpecID);
            return {
              SpecID: s.SpecID,
              OptionID: variantSpec ? variantSpec.OptionID : s.OptionID,
              Value: undefined,
            };
          });
        }
        setSpecValues(specVals);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineItem, specs, variants]);

  // Set the variant when specs are updated
  useEffect(() => {
    if (variants && specValues.length > 0) {
      const variantDefinitionSpecs: { SpecID: string; OptionID: string }[] = [];
      specs.forEach((spec) => {
        if (spec.DefinesVariant) {
          specValues.forEach((specvalue) => {
            if (specvalue.SpecID == spec.ID) {
              const tempSpec = {
                SpecID: specvalue.SpecID,
                OptionID: specvalue.OptionID,
              };
              variantDefinitionSpecs.push(tempSpec);
            }
          });
        }
      });

      for (let i = 0; i < variants.length; i++) {
        const totalSpecs = variantDefinitionSpecs.length;
        let specsFound = 0;

        variants[i].Specs.forEach((spec) => {
          const tempSpec = {
            SpecID: spec.SpecID,
            OptionID: spec.OptionID,
          };
          const testOne = JSON.stringify(variantDefinitionSpecs);
          const testTwo = JSON.stringify(tempSpec);
          if (testOne.indexOf(testTwo) != -1) {
            specsFound++;
          }
        });

        if (specsFound == totalSpecs) {
          setVariant(variants[i]);
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specValues]);

  const handleSpecFieldChange = (values: OrderCloudSpec) => {
    const tempSpecs: OrderCloudSpec[] = specValues.map((s) => {
      if (s.SpecID === values.SpecID) {
        return {
          SpecID: values.SpecID,
          OptionID: values.OptionID === 'OpenText' ? undefined : values.OptionID,
          Value: values.Value,
        };
      }
      return s;
    });

    setSpecValues(tempSpecs);
  };

  const handleAddToCart = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      await dispatch(createLineItem({ ProductID: product.ID, Quantity: 1, Specs: specValues }));
      setLoading(false);
    },
    [dispatch, product, specValues]
  );

  const productImage =
    variant?.xp?.Images.length > 0 && variant?.xp?.Images[0].Url ? (
      <img className="product-image-main" src={variant.xp.Images[0].Url} alt="variant" />
    ) : product?.xp?.Images.length > 0 && product?.xp?.Images[0].Url ? (
      <img className="product-image-main" src={product.xp.Images[0].Url} alt="product" />
    ) : null;

  // Force route to reload when navigating to a specific variant
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const goToVariant = (variantID: string) => {
    window.location.href = `/shop/products/${product.ID}/${productName}/${variantID}`;
  };
  const theProduct = product ? (
    <section className="section">
      <div className="section__content container">
        <div className="product-detail">
          <div className="product-detail-hero">
            <div className="product-image">{productImage}</div>
            <div className="product-description">
              <h2>{product.Name}</h2>
              <p>SKU: {sku}</p>
              <div>{product.Description}</div>
              <div>
                Price:{' '}
                <span className="product-price">{product.PriceSchedule.PriceBreaks[0].Price}</span>
              </div>
              <form onSubmit={handleAddToCart}>
                <ProductSpecList
                  specs={specs}
                  specValues={specValues}
                  onChange={handleSpecFieldChange}
                />
                <ProductVariantList
                  variants={variants}
                  variantID={variantID}
                  onChange={goToVariant}
                />
                <ProductQuantityInput
                  controlId="addToCart"
                  priceSchedule={product.PriceSchedule}
                  quantity={quantity}
                  onChange={setQuantity}
                />
                <div className="product-add-to-cart">
                  <button type="submit" className="btn--main btn--main--round" disabled={loading}>
                    {`${lineItem ? 'Update' : 'Add To'} Cart`}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="product-info">
            <div className="product-list product-list-also-viewed">
              <h2>Customers who viewed this item also viewed</h2>
              <div className="shop-by-container">
                {moreProducts?.map((p, index) => (
                  <Product key={index} {...p} />
                ))}
              </div>
            </div>
            <div className="product-list product-list-similar">
              <h2>Similar items to explore</h2>
              <div className="shop-by-container">
                {similarProducts?.map((p, index) =>
                  index < 5 ? <Product key={index} {...p} /> : ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;

  return theProduct;
};

export default ProductDetailsContent;
