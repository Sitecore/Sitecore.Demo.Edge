import Head from 'next/head';
import { ShopLayout } from '../../../components/Products/Shop';
import ProductDetails from '../../../components/Products/ProductDetails';
import { ReactElement } from 'react';

const ProductPage = (): JSX.Element => {
  return <ProductDetails />;
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - My Account</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default ProductPage;
