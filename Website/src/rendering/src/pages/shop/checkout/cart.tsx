import Head from 'next/head';
import Link from 'next/link';
import { ShopLayout } from 'components/Products/Shop';

const Cart = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Cart</title>
      </Head>

      <p>Cart Page</p>
      <div>
        <Link href="/shop/checkout/quick-checkout">
          <a>Go to Checkout</a>
        </Link>
      </div>
    </ShopLayout>
  );
};

export default Cart;
