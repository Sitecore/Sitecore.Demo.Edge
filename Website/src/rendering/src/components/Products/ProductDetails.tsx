import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { trackPDPViewEvent } from '@sitecore-discover/react';
import useOcProductDetail from '../../hooks/useOcProductDetail';
import ProductDetailsContent from './ProductDetailsContent';
import { updateDiscoverContext } from '../../services/DiscoverService';

const ProductDetails = (): JSX.Element => {
  // Products without variants: /shop/products/[productGroup, same as SKU]/[product-name]
  // Products with variants:
  // Without a selected variant: /shop/products/[productGroup]/[product-name]
  // With a pre-selected variant: /shop/products/[productGroup]/[product-name]/[SKU]
  const router = useRouter();
  const sku = router?.query?.sections?.length > 0 ? router.query.sections[0] : undefined;
  const variantID = router?.query?.sections?.length > 2 ? router.query.sections[2] : undefined;

  const { product, loading, specs, variants } = useOcProductDetail(sku?.toString());

  useEffect(() => {
    const productSku = variantID || sku;
    if (!productSku) {
      return;
    }

    trackPDPViewEvent(productSku);
  }, [sku, variantID]);

  // Update the Discover context when clicking the back button on a product details page
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        updateDiscoverContext();
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  return (
    <ProductDetailsContent
      initialLoading={loading}
      variantID={variantID}
      product={product}
      specs={specs}
      variants={variants}
    />
  );
};

export default ProductDetails;
