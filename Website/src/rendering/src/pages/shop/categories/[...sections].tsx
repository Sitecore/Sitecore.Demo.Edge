import Head from 'next/head';
import { ShopLayout } from '../../../components/Products/Shop';
import DiscoverWidget from '../../../components/ShopCommon/DiscoverWidget';

const CategoryPage = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Category</title>
      </Head>
      <DiscoverWidget rfkId="rfkid_10" />
    </ShopLayout>
  );
};

export default CategoryPage;
