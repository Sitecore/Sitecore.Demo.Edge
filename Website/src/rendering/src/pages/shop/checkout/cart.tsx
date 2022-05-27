import { ReactElement } from 'react';
import Head from 'next/head';
import { ShopLayout } from 'components/Products/Shop';
import CartDetails from 'components/Checkout/CartDetails';

const Cart = (): JSX.Element => {
  return <CartDetails />;
};

Cart.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Cart</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default Cart;
