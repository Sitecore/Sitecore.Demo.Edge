import Head from 'next/head';
import { ReactElement } from 'react';
import { ShopLayout } from '../../../components/Products/Shop';
import AddressBookFormSection from '../../../components/Account/AddressBookFormSection';
import ShopBreadcrumb, { ShopBreadcrumbItem } from '../../../components/Navigation/ShopBreadcrumb';
import { AccountLayout } from '../../../components/Account/AccountLayout';

const NewAddressPage = (): JSX.Element => {
  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/account/create', displayName: 'Create' },
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

      <AddressBookFormSection />
    </>
  );
};

NewAddressPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Create a new address</title>
      </Head>

      <AccountLayout>{page}</AccountLayout>
    </ShopLayout>
  );
};

export default NewAddressPage;
