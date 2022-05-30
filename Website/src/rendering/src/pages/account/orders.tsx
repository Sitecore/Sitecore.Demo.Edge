import Head from 'next/head';
import { ShopLayout } from '../../components/Products/Shop';
import OrderHistoryGrid from '../../components/Account/OrderHistoryGrid';

const Orders = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! Summit - Orders</title>
      </Head>

      <OrderHistoryGrid />
    </ShopLayout>
  );
};

export default Orders;
