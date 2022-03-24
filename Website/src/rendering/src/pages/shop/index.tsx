import Head from 'next/head';
import { useEffect } from 'react';
import { logViewEvent } from '../../services/CdpService';
import { ShopLayout } from '../../components/Products/Shop';

const Shop = (): JSX.Element => {
  useEffect(() => {
    logViewEvent();
  });

  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP</title>
      </Head>
      <section className="section">
        <div className="section__content container">Content here</div>
      </section>
    </ShopLayout>
  );
};

export default Shop;
