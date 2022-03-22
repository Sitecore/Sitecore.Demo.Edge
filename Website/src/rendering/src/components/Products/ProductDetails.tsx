import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import useOcProductDetail from '../../hooks/useOcProductDetail';
import { logViewEvent } from '../../services/CdpService';
import ProductDetailsContent from './ProductDetailsContent';

type DiscoverProduct = {
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
      value: [DiscoverProduct];
    };
  };
};

type DiscoverResponse = {
  batch: [Widget];
};

const ProductDetails = (): JSX.Element => {
  const [similarProducts, setSimilarProducts] = useState<DiscoverProduct[] | undefined>(undefined);
  const [moreProducts, setMoreProducts] = useState<DiscoverProduct[] | undefined>(undefined);

  // Products without variants: /shop/products/[productGroup, same as SKU]/[product-name]
  // Products with variants:
  // Without a selected variant: /shop/products/[productGroup]/[product-name]
  // With a pre-selected variant: /shop/products/[productGroup]/[product-name]/[SKU]
  const router = useRouter();
  const sku = router?.query?.sections?.length > 0 ? router.query.sections[0] : undefined;
  const productName = router?.query?.sections?.length > 1 ? router.query.sections[1] : undefined;
  const variantID = router?.query?.sections?.length > 2 ? router.query.sections[2] : undefined;

  const { product, specs, variants } = useOcProductDetail(sku?.toString());

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

  const getWidgetById = (res: DiscoverResponse, id: string) => {
    return res.batch.find((widget: Widget) => widget.widget.rfkid === id);
  };

  const theProduct = product ? (
    <ProductDetailsContent
      sku={sku}
      productName={productName}
      variantID={variantID}
      product={product}
      specs={specs}
      variants={variants}
      similarProducts={similarProducts}
      moreProducts={moreProducts}
    />
  ) : null;

  return theProduct;
};

export default ProductDetails;
