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

      <section
        className="hero-image"
        style={{
          backgroundImage: `url("/assets/img/shop/order-thank-you.jpg")`,
        }}
      />
      <section className="shop-section text-center py-10">
        <h1 className="text-[3rem] text-blue font-bold uppercase">Thank you for your purchase!</h1>
        <p>Login or create an account to save your order summary</p>
        <Link href="/account/login">
          <a className="btn--main btn--main--round inline-block mt-4">Log in / Create Account</a>
        </Link>
      </section>
    </ShopLayout>
  );
};

export default OrderSummary;
