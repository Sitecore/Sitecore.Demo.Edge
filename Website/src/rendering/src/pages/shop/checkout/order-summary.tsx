import { useEffect } from 'react';
import Head from 'next/head';
import { logViewEvent } from 'src/services/CdpService';
import { ShopLayout } from 'components/Products/Shop';
import ThankYouSection from 'components/Checkout/ThankYouSection';
import ThankYouHero from 'components/Checkout/ThankYouHero';

const OrderSummary = (): JSX.Element => {
  useEffect(() => {
    logViewEvent();
  });

  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Order Summary</title>
      </Head>
      <ThankYouHero />
      <ThankYouSection />
    </ShopLayout>
  );
};

export default OrderSummary;
