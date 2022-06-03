import Head from 'next/head';
import { ReactElement } from 'react';
import { ShopLayout } from '../../../components/Products/Shop';
import DiscoverWidget from '../../../components/ShopCommon/DiscoverWidget';

const CategoryPage = (): JSX.Element => {
  return (
    <>
      <DiscoverWidget rfkId="rfkid_10" />
      <DiscoverWidget rfkId="rfkid_3" />
    </>
  );
};

CategoryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Category</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default CategoryPage;
