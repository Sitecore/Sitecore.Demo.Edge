import Head from 'next/head';
import { useEffect } from 'react';
import { logViewEvent } from '../../services/CdpService';
import ProductDetail from '../../components/Products/ProductDetail';
import { ShopLayout } from 'components/Products/Shop';

const Product = (): JSX.Element => {
  useEffect(() => {
    logViewEvent();
  });

  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - FATHOM1</title>
      </Head>

      <ProductDetail />
    </ShopLayout>
  );
};

export default Product;
