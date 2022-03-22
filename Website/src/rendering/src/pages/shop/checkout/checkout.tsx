import Head from 'next/head';
import { ShopLayout } from 'components/Products/Shop';
import CheckoutDetails from 'components/Checkout/CheckoutDetails';

const Checkout = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Checkout</title>
      </Head>
      <CheckoutDetails />
    </ShopLayout>
  );
};

export default Checkout;
