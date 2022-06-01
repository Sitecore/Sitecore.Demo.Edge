import { ReactElement } from 'react';
import Head from 'next/head';
import { ShopLayout } from '../../../components/Products/Shop';
import ShopBreadcrumb, { ShopBreadcrumbItem } from '../../../components/Navigation/ShopBreadcrumb';
import AddressBookFormSection from '../../../components/Account/AddressBookFormSection';

const EditAddressPage = (): JSX.Element => {
  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/account/address-book', displayName: 'Edit' },
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

EditAddressPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Edit Address</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default EditAddressPage;
