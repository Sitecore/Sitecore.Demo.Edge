import { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { logViewEvent } from 'src/services/CdpService';
import { ShopLayout } from 'components/Products/Shop';
import CartDetails from 'components/Checkout/CartDetails';

const Cart = (): JSX.Element => {
  useEffect(() => {
    logViewEvent();
  });

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
