import { WidgetsProvider } from '@sitecore-discover/react';
import Head from 'next/head';
import { ReactElement } from 'react';
import { ShopLayout } from '../../../components/Products/Shop';
import DiscoverWidget from '../../../components/ShopCommon/DiscoverWidget';
import DiscoverServiceConfig from '../../../services/DiscoverServiceConfig';
import { ReactQueryDevtools } from 'react-query/devtools';

const CategoryPage = (): JSX.Element => {
  const config = DiscoverServiceConfig();

  return (
    <>
      <WidgetsProvider {...config}>
        <DiscoverWidget rfkId="rfkid_10" />
        <DiscoverWidget rfkId="rfkid_3" />
        {/* Temp add react query dev tools for debugging */}
        <ReactQueryDevtools initialIsOpen />
      </WidgetsProvider>
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
