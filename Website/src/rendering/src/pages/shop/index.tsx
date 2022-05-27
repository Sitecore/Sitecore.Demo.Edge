import Head from 'next/head';
import { ReactElement, useEffect } from 'react';
import { logViewEvent } from '../../services/CdpService';
import { ShopLayout } from '../../components/Products/Shop';
import CategoriesList from '../../components/Products/CategoriesList';
import DiscoverWidget from '../../components/ShopCommon/DiscoverWidget';

const Shop = (): JSX.Element => {
  useEffect(() => {
    logViewEvent();
  });

  return (
    <>
      <CategoriesList
        title="Welcome to PLAY! SHOP"
        subtitle="Shop Trending Categories:"
        theme="orange"
      />
      <DiscoverWidget rfkId="rfkid_1" />
      <section className="section">
        <div className="section__content container">Content here</div>
      </section>
    </>
  );
};

Shop.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default Shop;
