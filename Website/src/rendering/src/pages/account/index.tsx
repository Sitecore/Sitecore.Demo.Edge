import Head from 'next/head';
import { ShopLayout } from '../../components/Products/Shop';

const Account = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - My Account</title>
      </Head>

      <p>My Account</p>
    </ShopLayout>
  );
};

export default Account;
