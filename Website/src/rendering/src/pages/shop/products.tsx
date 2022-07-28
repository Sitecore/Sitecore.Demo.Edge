import OrderCloudFullPageSearch from 'components/FullPageSearch/OrderCloudFullPageSearch';
import Head from 'next/head';
import { ReactElement } from 'react';
import { isDiscoverEnabled } from 'src/helpers/DiscoverHelper';
import { ShopLayout } from '../../components/Products/Shop';
import DiscoverWidget from '../../components/ShopCommon/DiscoverWidget';

const Products = (): JSX.Element => {
  const useOrderCloudFiltering = !isDiscoverEnabled;
  return useOrderCloudFiltering ? (
    <OrderCloudFullPageSearch />
  ) : (
    <>
      <DiscoverWidget rfkId="rfkid_7" /> {/* FullPageSearch */}
      <DiscoverWidget rfkId="rfkid_1" /> {/* RecommendedForYou */}
      <DiscoverWidget rfkId="rfkid_3" /> {/* RecentlyViewedProducts */}
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
