import Head from 'next/head';
import { useEffect } from 'react';
import { logViewEvent } from '../../services/CdpService';
import { ShopLayout } from '../../components/Products/Shop';
import DiscoverWidget from '../../components/ShopCommon/DiscoverWidget';

const Products = (): JSX.Element => {
  useEffect(() => {
    logViewEvent();
  });

  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Products</title>
      </Head>

      <DiscoverWidget rfkId="rfkid_7" />
    </ShopLayout>
  );
};

export default Products;
