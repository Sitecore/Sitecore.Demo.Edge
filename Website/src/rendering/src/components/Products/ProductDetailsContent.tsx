import { BuyerProduct, RequiredDeep, Spec, Variant } from 'ordercloud-javascript-sdk';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { createLineItem } from '../../redux/ocCurrentCart';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import ProductQuantityInput from './ProductQuantityInput';
import ProductSpecList, { OrderCloudSpec } from './ProductSpecList';
import ProductVariantList from './ProductVariantList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

interface ProductDetailsContentProps {
  sku?: string;
  productName?: string;
  variantID?: string;
  product: RequiredDeep<BuyerProduct>;
  specs: RequiredDeep<Spec>[];
  variants: RequiredDeep<Variant>[];
}

const ProductDetailsContent = ({
  sku,
  productName,
  variantID,
  product,
  specs,
  variants,
}: ProductDetailsContentProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [specValues, setSpecValues] = useState<OrderCloudSpec[]>([]);
  const [variant, setVariant] = useState<Variant>(undefined);

  // Handle LineItem edits
  const lineItemId = '';
  const lineItem = useAppSelector((slice) =>
    lineItemId && slice.ocCurrentCart.lineItems
      ? slice.ocCurrentCart.lineItems.find((lineItem) => lineItem.ID === lineItemId)
      : undefined
  );
  const [quantity, setQuantity] = useState(
    lineItem ? lineItem.Quantity : (product && product.PriceSchedule.MinQuantity) || 1
  );

  const determineDefaultOptionId = (spec: Spec) => {
    if (spec.DefaultOptionID) {
      return spec.DefaultOptionID;
    }

    return spec.OptionCount ? spec.Options[0].ID : undefined;
  };

  // Set the spec values on inital load and when the URL changes
  useEffect(() => {
    if (lineItem) {
      setSpecValues(lineItem.Specs);
    } else {
      let specVals: OrderCloudSpec[] = [];

      if (specs) {
        specVals = specs.map((spec) => {
          return {
            SpecID: spec.ID,
            OptionID: determineDefaultOptionId(spec),
            Value: spec.DefaultValue ? spec.DefaultValue : undefined,
          };
        });
      }

      if (variants) {
        if (variantID) {
          const tempVariant = variants.find((listedvariant) => listedvariant.ID == variantID);
          specVals = specVals.map((specValue) => {
            const variantSpec = tempVariant.Specs.find((spec) => spec.SpecID == specValue.SpecID);
            return {
              SpecID: specValue.SpecID,
              OptionID: variantSpec ? variantSpec.OptionID : specValue.OptionID,
              Value: undefined,
            };
          });
        }
        setSpecValues(specVals);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineItem, specs, variants, variantID]);

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
    const tempSpecs: OrderCloudSpec[] = specValues.map((spec) => {
      if (spec.SpecID === values.SpecID) {
        return {
          SpecID: values.SpecID,
          OptionID: values.OptionID === 'OpenText' ? undefined : values.OptionID,
          Value: values.Value,
        };
      }
      return spec;
    });

    setSpecValues(tempSpecs);
  };

  const handleAddToCart = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      await dispatch(
        createLineItem({
          ProductID: product.ID,
          Quantity: quantity,
          Specs: specValues,
        })
      );
      setLoading(false);
    },
    [dispatch, product, specValues, quantity]
  );

  const productImage =
    variant?.xp?.Images?.length > 0 && variant.xp.Images[0]?.Url ? (
      <img className="product-image-main" src={variant.xp.Images[0].Url} alt="variant" />
    ) : product?.xp?.Images?.length > 0 && product.xp.Images[0]?.Url ? (
      <img className="product-image-main" src={product.xp.Images[0].Url} alt="product" />
    ) : null;

  const addToCartButtonText = `${lineItem ? 'Update' : 'Add To'} Cart`;

  const variantsList = variants && !variantID && (
    <ProductVariantList sku={sku} productNameSlug={productName} variants={variants} />
  );

  // TODO: add functionality to button
  const btnWishList = (
    <button className="btn-wishlist" aria-label="Add to Wish List" type="button">
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );

  // TODO: add functionality to button
  const btnSaveLater = (
    <button className="btn-later" aria-label="Save for Later" type="button">
      <FontAwesomeIcon icon={faHistory} />
    </button>
  );

  const productDetails = product && (
    <section className="section">
      <div className="section__content container">
        <div className="product-detail">
          <div className="product-detail-hero">
            <h2>{product.Name}</h2>
            <div className="product-image">{productImage}</div>
            <div className="product-description">
              <div>
                Price:{' '}
                <span className="product-price">${product.PriceSchedule.PriceBreaks[0].Price}</span>
              </div>
              <form onSubmit={handleAddToCart}>
                <ProductSpecList
                  specs={specs}
                  specValues={specValues}
                  onChange={handleSpecFieldChange}
                />
                {variantsList}
                {/* TODO: Maybe get rid of this one, extract QuantityInput from Cart and use that instead */}
                <ProductQuantityInput
                  controlId="addToCart"
                  priceSchedule={product.PriceSchedule}
                  quantity={quantity}
                  onChange={setQuantity}
                />
                <div className="product-add-to-cart">
                  <button type="submit" className="btn--main btn--main--round" disabled={loading}>
                    {/* TODO: loader style */}
                    {!loading ? addToCartButtonText : '...'}
                  </button>
                  {btnSaveLater}
                  {btnWishList}
                </div>
              </form>
              <div>{product.Description}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return productDetails;
};

export default ProductDetailsContent;
