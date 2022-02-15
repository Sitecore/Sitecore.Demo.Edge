import Head from 'next/head';
import Link from 'next/link';
import { ShopLayout } from 'components/Products/Shop';

const Shipping = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Shipping</title>
      </Head>

      <p>Shipping Page</p>
      <div>
        <Link href="/shop/checkout/quick-checkout">
          <a>Back to Checkout</a>
        </Link>
      </div>
      <div>
        <Link href="/shop/checkout/billing">
          <a>Go to Billing Details</a>
        </Link>
      </div>
    </ShopLayout>
  );
};

export default Shipping;
