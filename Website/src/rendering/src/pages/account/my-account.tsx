import Head from 'next/head';
import { ShopLayout } from 'components/Products/Shop';
import MyAccount from 'components/Account/MyAccount';

const MyAccountPage = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! Summit - My Account</title>
      </Head>

      <MyAccount />
    </ShopLayout>
  );
};

export default MyAccountPage;
