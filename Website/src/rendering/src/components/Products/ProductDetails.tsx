import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useOcProductDetail from '../../hooks/useOcProductDetail';
import { logViewEvent } from '../../services/CdpService';
import ProductDetailsContent from './ProductDetailsContent';

const ProductDetails = (): JSX.Element => {
  // Products without variants: /shop/products/[productGroup, same as SKU]/[product-name]
  // Products with variants:
  // Without a selected variant: /shop/products/[productGroup]/[product-name]
  // With a pre-selected variant: /shop/products/[productGroup]/[product-name]/[SKU]
  const router = useRouter();
  const sku = router?.query?.sections?.length > 0 ? router.query.sections[0] : undefined;
  const productName = router?.query?.sections?.length > 1 ? router.query.sections[1] : undefined;
  const variantID = router?.query?.sections?.length > 2 ? router.query.sections[2] : undefined;

  const { product, specs, variants } = useOcProductDetail(sku?.toString());

  useEffect(() => {
    if (sku) {
      logViewEvent();
    }
  }, [sku]);

  const pageTitleProductName = product ? productName : 'Product not found';

  const productDetailsContent = product ? (
    <ProductDetailsContent
      sku={sku}
      productName={productName}
      variantID={variantID}
      product={product}
      specs={specs}
      variants={variants}
    />
  ) : (
    pageTitleProductName
  );

  return (
    <>
      <Head>
        <title>PLAY! SHOP - {pageTitleProductName}</title>
      </Head>

      {productDetailsContent}
    </>
  );
};

export default ProductDetails;
