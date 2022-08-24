import AddressBook from '../../components/Account/AddressBook';
import Head from 'next/head';
import { ReactElement } from 'react';
import ShopBreadcrumb, { ShopBreadcrumbItem } from '../../components/Navigation/ShopBreadcrumb';
import { ShopLayout } from '../../components/Products/Shop';
import { AccountLayout } from '../../components/Account/AccountLayout';

const AddressBookPage = (): JSX.Element => {
  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/account/address-book', displayName: 'Address book' },
    { urlPath: '/account', displayName: 'User profile' },
  ];

  return (
    <>
      <ShopBreadcrumb
        rendering={{ componentName: '' }}
        params={{}}
        fields={{ items: breadCrumbDefinitions }}
      />
      <AddressBook />
    </>
  );
};

AddressBookPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Address Book</title>
      </Head>

      <AccountLayout>{page}</AccountLayout>
    </ShopLayout>
  );
};

export default AddressBookPage;
