import Head from 'next/head';
import { ShopLayout } from '../../../components/Products/Shop';
import ProductDetailPage from 'components/Products/ProductDetailPage';
import { useRouter } from 'next/router';

// Example URL: /shop/products/64114
const ProductPage = (): JSX.Element => {
  const router = useRouter();
  const productName = router?.query?.sections?.length > 1 ? router.query.sections[1] : undefined;
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - {productName}</title>
      </Head>
      <ProductDetailPage />
    </ShopLayout>
  );
};

export default ProductPage;
