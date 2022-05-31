import { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { logViewEvent } from '../../../services/CdpService';
import { ShopLayout } from '../../../components/Products/Shop';
import CartDetails from '../../../components/Checkout/CartDetails';
import DiscoverWidget from '../../../components/ShopCommon/DiscoverWidget';

const Cart = (): JSX.Element => {
  useEffect(() => {
    logViewEvent();
  });

  return (
    <>
      <CartDetails />
      <DiscoverWidget rfkId="rfkid_1" />
      <DiscoverWidget rfkId="rfkid_3" />
    </>
  );
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
