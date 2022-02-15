import Head from 'next/head';
import Link from 'next/link';
import { ShopLayout } from 'components/Products/Shop';

interface CartProps {
  loading?: boolean;
  loaded?: boolean;
  // title?: string;
  products?: unknown[];
  dispatch?: () => unknown;
}

const Cart = (props: CartProps): JSX.Element => {
  return (
    <ShopLayout>
      {console.log({ props })}
      <Head>
        <title>PLAY! SHOP - Cart</title>
      </Head>

      <p>Cart Page</p>
      <div>
        <Link href="/shop/checkout/quick-checkout">
          <a>Go to Checkout</a>
        </Link>
      </div>
      <div data-rfkid="rfkid_11"></div>
    </ShopLayout>
  );
};

export default Cart;
