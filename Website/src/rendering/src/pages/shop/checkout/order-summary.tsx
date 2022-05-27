import { ReactElement, useEffect } from 'react';
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
    <>
      <ThankYouHero />
      <ThankYouSection />
    </>
  );
};

OrderSummary.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Order Summary</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default OrderSummary;
