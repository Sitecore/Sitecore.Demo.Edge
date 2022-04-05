import Head from 'next/head';
import { ShopLayout } from '../../../components/Products/Shop';
import ProductDetails from '../../../components/Products/ProductDetails';

const ProductPage = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Product</title>
      </Head>

      <ProductDetails />
    </ShopLayout>
  );
};

export default ProductPage;
