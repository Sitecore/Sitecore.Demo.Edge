import Head from 'next/head';
import { ShopLayout } from 'components/Products/Shop';
import CartDetails from 'components/Checkout/CartDetails';

const Cart = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Cart</title>
      </Head>

      <CartDetails editable={true} />
    </ShopLayout>
  );
};

export default Cart;
