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
import { Actions, PageController } from '@sitecore-discover/react';
import Spinner from '../../components/ShopCommon/Spinner';
import Skeleton from 'react-loading-skeleton';

interface ProductDetailsContentProps {
  variantID?: string;
  product: RequiredDeep<BuyerProduct>;
  specs: RequiredDeep<Spec>[];
  variants: RequiredDeep<Variant>[];
  initialLoading?: boolean;
}

const ProductDetailsContent = ({
  variantID,
  product,
  specs,
  variants,
  initialLoading,
}: ProductDetailsContentProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [specValues, setSpecValues] = useState<OrderCloudSpec[]>([]);
  const [variant, setVariant] = useState<Variant>(undefined);
  const loading = initialLoading || isLoading;

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

  const dispatchDiscoverAddToCartEvent = (product: BuyerProduct, quantity: number) => {
    PageController.getDispatcher().dispatch({
      type: Actions.ADD_TO_CART,
      payload: {
        page: 'pdp',
        // TODO: On product with variants, Product.ID is equal to the Discover product group, not the variant SKU. We must send the variant SKU.
        sku: product.ID,
        quantity: quantity,
        price:
          product.PriceSchedule.PriceBreaks[0].SalePrice ||
          product.PriceSchedule.PriceBreaks[0].Price,
        priceOriginal: product.PriceSchedule.PriceBreaks[0].Price,
      },
    });
  };

  const handleAddToCart = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      await dispatch(
        createLineItem({
          ProductID: product.ID,
          Quantity: quantity,
          Specs: specValues,
        })
      );
      dispatchDiscoverAddToCartEvent(product, quantity);
      setIsLoading(false);
    },
    [dispatch, product, specValues, quantity]
  );

  const productImageProps =
    variant?.xp?.Images?.length > 0 && variant.xp.Images[0]?.Url
      ? variant.xp.Images
      : product?.xp?.Images?.length > 0 && product.xp.Images[0]?.Url
      ? product.xp.Images
      : [];

  // TODO: add functionality to button
  const btnWishList = initialLoading ? (
    <Skeleton width={27} height={27} className="btn-wishlist" />
  ) : (
    <button className="btn-wishlist" aria-label="Add to Wish List" type="button">
      <FontAwesomeIcon icon={faHeart} size="lg" />
    </button>
  );

  // TODO: add functionality to button
  const btnSaveLater = initialLoading ? (
    <Skeleton width={27} height={27} className="btn-later" />
  ) : (
    <button className="btn-later" aria-label="Save for Later" type="button">
      <FontAwesomeIcon icon={faHistory} size="lg" />
    </button>
  );

  // TODO: add functionality to field
  const quantityAlert = initialLoading ? (
    <Skeleton className="quantity-alert" width={88} />
  ) : (
    <p className="quantity-alert">Only 3 left!</p>
  );

  const priceProps = {
    price: !loading && product.PriceSchedule.PriceBreaks[0].Price,
    finalPrice:
      !loading &&
      (product.PriceSchedule.PriceBreaks[0].SalePrice ||
        product.PriceSchedule.PriceBreaks[0].Price),
  };

  // TODO: get actual data
  const overviewProps = {
    items: [
      {
        heading: 'Full Desription',
        description: product?.Description,
        disabled: false,
      },
      {
        heading: 'Product Details',
        description: product?.Description,
        disabled: false,
      },
      {
        heading: 'Delivery Info',
        description: product?.Description,
        disabled: false,
      },
      {
        heading: 'Return Policy',
        description: product?.Description,
        disabled: true,
      },
    ],
  };

  const btnAddToCart = initialLoading ? (
    <Skeleton className="btn--main" width={168} />
  ) : (
    <button type="submit" className="btn--main btn--main--round" disabled={loading}>
      {/* TODO: Extract JSX logic into a const */}
      <Spinner loading={loading} /> {`${lineItem ? 'Update' : 'Add To'} Cart`}
    </button>
  );

  const productAddToCart = (
    <div className="product-add-to-cart">
      {btnAddToCart}
      {btnSaveLater}
      {btnWishList}
    </div>
  );

  const productDetails =
    loading || product ? (
      <section className="section">
        <div className="shop-container">
          <div className="product-details">
            <div className="product-details-hero">
              <h2 className="product-name">
                {/* TODO: Extract JSX logic into a const */}
                {initialLoading ? <Skeleton width={300} /> : product && product.Name}
              </h2>
              <ProductImage images={productImageProps} loading={initialLoading} />
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
                      priceSchedule={product?.PriceSchedule}
                      initialQuantity={quantity}
                      onChange={setQuantity}
                      loading={loading}
                    />
                    {quantityAlert}
                  </div>
                  <PriceReact {...priceProps} altTheme sizeL loading={initialLoading} />
                  {productAddToCart}
                </form>
              </div>
              <ProductOverview {...overviewProps} loading={initialLoading} />
            </div>
          </div>
        </div>
      </section>
    ) : (
      <div>Product not found</div>
    );

  return (
    <>
      <Head>
        <title>
          {/* TODO: Extract JSX logic into a const */}
          PLAY! SHOP - {loading ? 'loading...' : product ? product.Name : 'Product not found'}
        </title>
      </Head>
      {productDetails}
    </>
  );
};

export default ProductDetailsContent;
