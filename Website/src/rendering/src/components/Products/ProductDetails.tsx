import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import useOcProductDetail from '../../hooks/useOcProductDetail';
import { logViewEvent } from '../../services/CdpService';
import ProductDetailsContent from './ProductDetailsContent';

const ProductDetailsSkeleton = (): JSX.Element => {
  return (
    <section className="section">
      <div className="shop-container">
        <div className="product-details product-details-skeleton">
          <div className="product-details-hero">
            <h2 className="product-name">
              <Skeleton width={300} />
            </h2>
            <div className="product-image">
              <Skeleton />
            </div>
            <div className="product-description">
              <Skeleton height={164} />
            </div>
            <div className="product-overview accordion">
              <Skeleton height={300} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
    if (sku) {
      logViewEvent();
    }
  }, [sku]);

  const getProductDetailsContent = () => {
    if (loading) {
      return <ProductDetailsSkeleton />;
    } else if (product) {
      return (
        <ProductDetailsContent
          variantID={variantID}
          product={product}
          specs={specs}
          variants={variants}
        />
      );
    } else {
      return (
        <>
          <Head>
            <title>PLAY! SHOP - Product not found</title>
          </Head>
          Product not found
        </>
      );
    }
  };

  return getProductDetailsContent();
};

export default ProductDetails;
