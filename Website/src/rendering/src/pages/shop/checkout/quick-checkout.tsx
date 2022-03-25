import Head from 'next/head';
import { ShopLayout } from 'components/Products/Shop';
import CheckoutDetails from 'components/Checkout/CheckoutDetails';
import Link from 'next/link';

const Checkout = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Checkout</title>
      </Head>
      <div>
        <Link href="/shop/checkout/cart">
          <a>Back to Cart</a>
        </Link>
      </div>
      <div>
        <Link href="/shop/checkout/shipping">
          <a>Continue as Guest and Go to Shipping Details</a>
        </Link>
      </div>
      <div>
        <Link href="/account/login">
          <a>Login/ Create Account</a>
        </Link>
      </div>
      <CheckoutDetails />
    </ShopLayout>
  );
};

export default Checkout;
