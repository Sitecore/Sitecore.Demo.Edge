import Head from 'next/head';
import { ReactElement } from 'react';
import { ShopLayout } from '../../components/Products/Shop';
import DiscoverWidget from '../../components/ShopCommon/DiscoverWidget';

const Products = (): JSX.Element => {
  return (
    <>
      <DiscoverWidget rfkId="rfkid_7" />
      <DiscoverWidget rfkId="rfkid_1" />
      <DiscoverWidget rfkId="rfkid_3" />
    </>
  );
};

Products.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Products</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default Products;
