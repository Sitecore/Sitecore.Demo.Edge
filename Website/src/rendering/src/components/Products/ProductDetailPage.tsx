import { useRouter } from 'next/router';
import { Spec, Variant } from 'ordercloud-javascript-sdk';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import useOcProductDetail from 'src/hooks/useOcProductDetail';
import { createLineItem } from 'src/redux/ocCurrentCart';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { logViewEvent } from 'src/services/CdpService';
import ProductQuantityInput from './ProductQuantityInput';
import ProductSpecField from './ProductSpecField';
import { Product } from './Shop';

type ProductProps = {
  name: string;
  price: number;
  image_url: string;
  brand: string;
  sku: string;
};

type Widget = {
  widget: {
    rfkid: string;
  };
  content: {
    product: {
      value: [ProductProps];
    };
  };
};

type rfkResponse = {
  batch: [Widget];
};

type specProps = {
  SpecID: string;
  OptionID?: string;
  Value?: string;
};

const ProductDetailPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [similarProducts, setSimilarProducts] = useState<ProductProps[] | undefined>(undefined);
  const [moreProducts, setMoreProducts] = useState<ProductProps[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [specValues, setSpecValues] = useState<specProps[]>([]);

  // Products without variants: /shop/products/[productGroup, same as SKU]/[product-name]
  // Products with variants:
  // Without a selected variant: /shop/products/[productGroup]/[product-name]
  // With a pre-selected variant: /shop/products/[productGroup]/[product-name]/[SKU]
  const router = useRouter();
  const sku = router?.query?.sections?.length > 0 ? router.query.sections[0] : undefined;
  const productName = router?.query?.sections?.length > 1 ? router.query.sections[1] : undefined;
  const variantID = router?.query?.sections?.length > 2 ? router.query.sections[2] : undefined;

  const { product, specs, variants } = useOcProductDetail(sku?.toString());
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
    let specVals: specProps[] = [];
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

  const handleSpecFieldChange = (values: specProps) => {
    const tempSpecs: specProps[] = specValues.map((s) => {
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

  const fetchData = useCallback(() => {
    const data = {
      context: {
        page: {
          uri: '/hs/product/details',
          locale_country: 'us',
          locale_language: 'en',
          sku: sku,
        },
        user: {
          uuid: '123',
          user_id: '123',
        },
      },
      batch: [
        { widget: { rfkid: 'hs_pdp' } },
        { widget: { rfkid: 'hs_sim' } },
        { widget: { rfkid: 'hs_more' } },
      ],
      content: { product: { field: { value: ['image_url', 'name', 'price', 'brand', 'sku'] } } },
    };

    const headers = [
      ['Authorization', '01-90d83624-99f708fa77a1e96a25c4a2afd0f28a4c23ff5251'],
      ['Content-Type', 'application/json'],
    ];

    const url = 'https://api.rfksrv.com/search-rec/11269-125757327/3';

    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then((res) => {
        const similarProducts = getWidgetById(res, 'hs_sim');
        const moreProducts = getWidgetById(res, 'hs_more');

        setSimilarProducts(similarProducts?.content.product.value);
        setMoreProducts(moreProducts?.content.product.value);
      });
  }, [sku]);

  useEffect(() => {
    if (sku) {
      logViewEvent();
      fetchData();
    }
  }, [sku, fetchData]);

  const getWidgetById = (res: rfkResponse, id: string) => {
    return res.batch.find((widget: Widget) => widget.widget.rfkid === id);
  };

  const productImage =
    variant?.xp?.Images.length > 0 && variant?.xp?.Images[0].Url ? (
      <img className="product-image-main" src={variant.xp.Images[0].Url} alt="variant" />
    ) : product?.xp?.Images.length > 0 && product?.xp?.Images[0].Url ? (
      <img className="product-image-main" src={product.xp.Images[0].Url} alt="product" />
    ) : null;

  // Force route to reload when navigating to a specific variant
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const goToVariant = (link: string) => {
    window.location.href = link;
  };
  return product ? (
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
                {specs ? (
                  <div>
                    Specs:
                    <div className="product-specs">
                      {specs?.map((spec) => {
                        const specValue = specValues.find(
                          (specValue) => specValue.SpecID === spec.ID
                        );
                        return (
                          <ProductSpecField
                            key={spec.ID}
                            spec={spec}
                            onChange={handleSpecFieldChange}
                            optionId={specValue && specValue.OptionID}
                            value={specValue && specValue.Value}
                          />
                        );
                      })}
                    </div>
                  </div>
                ) : null}
                {variants && !variantID ? (
                  <div>
                    Variants:
                    <div className="product-variants">
                      <ul>
                        {variants?.map((variant, index) => (
                          <li key={index}>
                            <button
                              onClick={() =>
                                goToVariant(
                                  `/shop/products/${product.ID}/${productName}/${variant.ID}`
                                )
                              }
                            >
                              {variant.Name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
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
};

export default ProductDetailPage;
