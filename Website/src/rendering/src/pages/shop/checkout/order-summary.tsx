import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { logViewEvent } from 'src/services/CdpService';
import { ShopLayout } from 'components/Products/Shop';

const OrderSummary = (): JSX.Element => {
  useEffect(() => {
    logViewEvent();
  });

  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Order Summary</title>
      </Head>

      <p>Order Summary Page</p>
      <p>Thank you for your purchase!</p>
      <div>
        <Link href="/account/login">
          <a>Login/ Create Account to save your order summary</a>
        </Link>
      </div>
    </ShopLayout>
  );
};

export default OrderSummary;
