import Head from 'next/head';
import { ReactElement } from 'react';
import { ShopLayout } from '../../../components/Products/Shop';
import ProductDetails from '../../../components/Products/ProductDetails';
import DiscoverWidget from '../../../components/ShopCommon/DiscoverWidget';

const ProductPage = (): JSX.Element => {
  return (
    <>
      <ProductDetails />
      <DiscoverWidget rfkId="rfkid_33" />
      <DiscoverWidget rfkId="rfkid_31" />
      <DiscoverWidget rfkId="rfkid_3" />
    </>
  );
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Product</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default ProductPage;
