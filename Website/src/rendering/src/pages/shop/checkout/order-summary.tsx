import { useEffect } from 'react';
import Head from 'next/head';
import { logViewEvent } from 'src/services/CdpService';
import { ShopLayout } from 'components/Products/Shop';
import ThankYouSection from 'components/Checkout/ThankYouSection';

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
      <ThankYouSection />
    </ShopLayout>
  );
};

export default OrderSummary;
