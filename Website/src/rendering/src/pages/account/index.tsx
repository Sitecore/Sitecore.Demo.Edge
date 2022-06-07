import UserProfile from '../../components/Account/UserProfile';
import Head from 'next/head';
import { ReactElement } from 'react';
import { ShopLayout } from '../../components/Products/Shop';
import { AccountLayout } from '../../components/Account/AccountLayout';

const Account = (): JSX.Element => {
  return <UserProfile />;
};

Account.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - My Account</title>
      </Head>

      <AccountLayout>{page}</AccountLayout>
    </ShopLayout>
  );
};

export default Account;
