import Head from 'next/head';
import { ShopLayout } from 'components/Products/Shop';
import ThankYouSection from 'components/Checkout/ThankYouSection';
import ThankYouHero from 'components/Checkout/ThankYouHero';

const OrderSummary = (): JSX.Element => {
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
