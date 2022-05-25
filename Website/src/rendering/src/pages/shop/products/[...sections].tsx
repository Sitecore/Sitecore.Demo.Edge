import Head from 'next/head';
import { ShopLayout } from '../../../components/Products/Shop';
import ProductDetails from '../../../components/Products/ProductDetails';
import DiscoverWidget from '../../../components/ShopCommon/DiscoverWidget';

const ProductPage = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Product</title>
      </Head>

      <ProductDetails />
      <h3>What other items do customers buy after this one?</h3>
      <DiscoverWidget rfkId="rfkid_33" />
    </ShopLayout>
  );
};

export default ProductPage;
