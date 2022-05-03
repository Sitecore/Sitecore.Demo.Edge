import Head from 'next/head';
import { ShopLayout } from 'components/Products/Shop';
import OrderHistoryDetails from 'components/Account/OrderHistoryDetails';

const MyOrdersPage = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! Summit - My Orders</title>
      </Head>

      <OrderHistoryDetails />
    </ShopLayout>
  );
};

export default MyOrdersPage;
