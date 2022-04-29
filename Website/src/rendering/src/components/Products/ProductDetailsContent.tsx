import Head from 'next/head';
import { BuyerProduct, RequiredDeep, Spec, Variant } from 'ordercloud-javascript-sdk';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { createLineItem } from '../../redux/ocCurrentCart';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import QuantityInput from '../ShopCommon/QuantityInput';
import ProductSpecList, { OrderCloudSpec } from './ProductSpecList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { PriceReact } from '../ShopCommon/Price';
import ProductOverview from './ProductOverview';
import ProductImage from './ProductImage';

interface ProductDetailsContentProps {
  variantID?: string;
  product: RequiredDeep<BuyerProduct>;
  specs: RequiredDeep<Spec>[];
  variants: RequiredDeep<Variant>[];
}

const ProductDetailsContent = ({
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

  const productImageProps =
    variant?.xp?.Images?.length > 0 && variant.xp.Images[0]?.Url
      ? variant.xp.Images
      : product?.xp?.Images?.length > 0 && product.xp.Images[0]?.Url
      ? product.xp.Images
      : null;

  const addToCartButtonText = `${lineItem ? 'Update' : 'Add To'} Cart`;

  // TODO: add functionality to button
  const btnWishList = (
    <button className="btn-wishlist" aria-label="Add to Wish List" type="button">
      <FontAwesomeIcon icon={faHeart} size="lg" />
    </button>
  );

  // TODO: add functionality to button
  const btnSaveLater = (
    <button className="btn-later" aria-label="Save for Later" type="button">
      <FontAwesomeIcon icon={faHistory} size="lg" />
    </button>
  );

  // TODO: add functionality to field
  const quantityAlert = <p className="quantity-alert">Only 3 left!</p>;

  const priceProps = {
    price: product.PriceSchedule.PriceBreaks[0].Price,
    finalPrice:
      product.PriceSchedule.PriceBreaks[0].SalePrice || product.PriceSchedule.PriceBreaks[0].Price,
  };

  // TODO: get actual data
  const overviewProps = {
    items: [
      {
        heading: 'Full Desription',
        description: product.Description,
        disabled: false,
      },
      {
        heading: 'Product Details',
        description: product.Description,
        disabled: false,
      },
      {
        heading: 'Delivery Info',
        description: product.Description,
        disabled: false,
      },
      {
        heading: 'Return Policy',
        description: product.Description,
        disabled: true,
      },
    ],
  };

  const productDetails = product && (
    <>
      <Head>
        <title>PLAY! SHOP - {product.Name}</title>
      </Head>

      <section className="section">
        <div className="shop-container">
          <div className="product-details">
            <div className="product-details-hero">
              <h2 className="product-name">{product.Name}</h2>
              <ProductImage images={productImageProps} />
              <div className="product-description">
                <form onSubmit={handleAddToCart}>
                  <ProductSpecList
                    specs={specs}
                    specValues={specValues}
                    onChange={handleSpecFieldChange}
                  />
                  <div className="product-quantity">
                    <QuantityInput
                      controlId={variantID}
                      priceSchedule={product.PriceSchedule}
                      initialQuantity={quantity}
                      onChange={setQuantity}
                    />
                    {quantityAlert}
                  </div>
                  <PriceReact {...priceProps} altTheme sizeL />
                  <div className="product-add-to-cart">
                    <button type="submit" className="btn--main btn--main--round" disabled={loading}>
                      {/* TODO: loader style */}
                      {!loading ? addToCartButtonText : '...'}
                    </button>
                    {btnSaveLater}
                    {btnWishList}
                  </div>
                </form>
              </div>
              <ProductOverview {...overviewProps} />
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return productDetails;
};

export default ProductDetailsContent;
