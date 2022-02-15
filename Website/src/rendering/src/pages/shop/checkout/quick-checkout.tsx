import Head from 'next/head';
import Link from 'next/link';
import { ShopLayout } from 'components/Products/Shop';

const QuickCheckout = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Quick Checkout</title>
      </Head>

      <p>Quick Checkout Page</p>
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
    </ShopLayout>
  );
};

export default QuickCheckout;
