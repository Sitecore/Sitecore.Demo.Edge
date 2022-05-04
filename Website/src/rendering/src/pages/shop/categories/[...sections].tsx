import Head from 'next/head';
import { ShopLayout } from '../../../components/Products/Shop';
import { Widget } from '@sitecore-discover/react';

const CategoryPage = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Category</title>
      </Head>
      <Widget rfkId="rfkid_10" />
    </ShopLayout>
  );
};

export default CategoryPage;
