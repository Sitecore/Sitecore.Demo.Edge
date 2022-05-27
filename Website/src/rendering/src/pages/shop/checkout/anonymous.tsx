import { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { logViewEvent } from 'src/services/CdpService';
import { ShopLayout } from 'components/Products/Shop';
import ShopBreadcrumb, { ShopBreadcrumbItem } from 'components/Navigation/ShopBreadcrumb';
import PreCheckout from 'components/Checkout/PreCheckout';

const Anonymous = (): JSX.Element => {
  useEffect(() => {
    logViewEvent();
  });

  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/shop/checkout/checkout', displayName: 'Checkout' },
    { urlPath: '/shop/checkout/cart', displayName: 'Cart' },
  ];

  return (
    <>
      <ShopBreadcrumb
        rendering={{ componentName: '' }}
        params={{}}
        fields={{ items: breadCrumbDefinitions }}
      />
      <PreCheckout />
    </>
  );
};

Anonymous.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Checkout</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default Anonymous;
