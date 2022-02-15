import Head from 'next/head';
import Link from 'next/link';
import { ShopLayout } from 'components/Products/Shop';

const FinalConfirmation = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Final Confirmation</title>
      </Head>

      <p>Final Confirmation Page</p>
      <div>
        <Link href="/shop/checkout/billing">
          <a>Back to Billing Details</a>
        </Link>
      </div>
      <div>
        <Link href="/shop/checkout/order-summary">
          <a>Pay and Go to Order Summary</a>
        </Link>
      </div>
    </ShopLayout>
  );
};

export default FinalConfirmation;
