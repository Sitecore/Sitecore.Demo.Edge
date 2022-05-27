import Head from 'next/head';
import { ReactElement } from 'react';
import { ShopLayout } from '../../components/Products/Shop';

const Account = (): JSX.Element => {
  return <p>My Account</p>;
};

Account.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - My Account</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default Account;
