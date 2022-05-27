import { ReactElement } from 'react';
import Head from 'next/head';
import { ShopLayout } from 'components/Products/Shop';
import ThankYouSection from 'components/Checkout/ThankYouSection';
import ThankYouHero from 'components/Checkout/ThankYouHero';

const OrderSummary = (): JSX.Element => {
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
