import Head from 'next/head';
import { ShopLayout } from 'components/Products/Shop';

const Cart = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! Summit - Login</title>
      </Head>

      <p>Login Page</p>
    </ShopLayout>
  );
};

export default Cart;
