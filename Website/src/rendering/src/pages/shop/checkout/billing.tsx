import Head from 'next/head';
import Link from 'next/link';
import { ShopLayout } from 'components/Products/Shop';

const Billing = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Billing</title>
      </Head>

      <p>Billing Page</p>
      <div>
        <Link href="/shop/checkout/shipping">
          <a>Back to Shipping Details</a>
        </Link>
      </div>
      <div>
        <Link href="/shop/checkout/final-confirmation">
          <a>Go to Final Confirmation</a>
        </Link>
      </div>
    </ShopLayout>
  );
};

export default Billing;
