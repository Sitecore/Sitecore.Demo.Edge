import OrderCloudFullPageSearch from 'components/FullPageSearch/OrderCloudFullPageSearch';
import Head from 'next/head';
import { ReactElement } from 'react';
import { isDiscoverEnabled } from 'src/helpers/DiscoverHelper';
import { ShopLayout } from '../../../components/Products/Shop';
import DiscoverWidget from '../../../components/ShopCommon/DiscoverWidget';

const CategoryPage = (): JSX.Element => {
  const useOrderCloudFiltering = !isDiscoverEnabled;
  return useOrderCloudFiltering ? (
    <OrderCloudFullPageSearch />
  ) : (
    <>
      <DiscoverWidget rfkId="rfkid_10" /> {/* FullPageSearch */}
      <DiscoverWidget rfkId="rfkid_3" /> {/* RecentlyViewedProducts */}
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
