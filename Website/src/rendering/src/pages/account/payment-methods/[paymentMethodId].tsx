import { ReactElement } from 'react';
import Head from 'next/head';
import { ShopLayout } from '../../../components/Products/Shop';
import ShopBreadcrumb, { ShopBreadcrumbItem } from '../../../components/Navigation/ShopBreadcrumb';
import { AccountLayout } from '../../../components/Account/AccountLayout';
import PaymentMethodsFormSection from '../../../components/Account/PaymentMethodsFormSection';

const EditPaymentMethodPage = (): JSX.Element => {
  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/account/payment-methods', displayName: 'Edit' },
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

EditPaymentMethodPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Edit Payment Method</title>
      </Head>

      <AccountLayout>{page}</AccountLayout>
    </ShopLayout>
  );
};

export default EditPaymentMethodPage;
