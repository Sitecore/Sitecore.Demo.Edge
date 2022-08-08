import Head from 'next/head';
import { ReactElement } from 'react';
import { ShopLayout } from '../../../components/Products/Shop';
import ShopBreadcrumb, { ShopBreadcrumbItem } from '../../../components/Navigation/ShopBreadcrumb';
import { AccountLayout } from '../../../components/Account/AccountLayout';
import PaymentMethodsFormSection from '../../../components/Account/PaymentMethodsFormSection';

const NewPaymentMethodPage = (): JSX.Element => {
  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/account/payment-methods/create', displayName: 'Create' },
    { urlPath: '/account/payment-methods', displayName: 'Payment methods' },
    { urlPath: '/account', displayName: 'User profile' },
  ];

  return (
    <>
      <ShopBreadcrumb
        rendering={{ componentName: '' }}
        params={{}}
        fields={{ items: breadCrumbDefinitions }}
      />

      <PaymentMethodsFormSection />
    </>
  );
};

NewPaymentMethodPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Create a new payment method</title>
      </Head>

      <AccountLayout>{page}</AccountLayout>
    </ShopLayout>
  );
};

export default NewPaymentMethodPage;
