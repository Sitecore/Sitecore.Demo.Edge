import Head from 'next/head';
import { ReactElement } from 'react';
import ShopBreadcrumb, { ShopBreadcrumbItem } from '../../components/Navigation/ShopBreadcrumb';
import { ShopLayout } from '../../components/Products/Shop';
import { AccountLayout } from '../../components/Account/AccountLayout';
import PaymentMethods from '../../components/Account/PaymentMethods';

const PaymentMethodsPage = (): JSX.Element => {
  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/account/payment-methods', displayName: 'Payment Methods' },
    { urlPath: '/account', displayName: 'User profile' },
  ];

  return (
    <>
      <ShopBreadcrumb
        rendering={{ componentName: '' }}
        params={{}}
        fields={{ items: breadCrumbDefinitions }}
      />
      <PaymentMethods />
    </>
  );
};

PaymentMethodsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Payment Methods</title>
      </Head>

      <AccountLayout>{page}</AccountLayout>
    </ShopLayout>
  );
};

export default PaymentMethodsPage;
