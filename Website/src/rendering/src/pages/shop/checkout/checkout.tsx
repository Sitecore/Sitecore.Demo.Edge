import { useEffect } from 'react';
import Head from 'next/head';
import { logViewEvent } from 'src/services/CdpService';
import { ShopLayout } from 'components/Products/Shop';
import ShopBreadcrumb, { ShopBreadcrumbItem } from 'components/Navigation/ShopBreadcrumb';
import CheckoutDetails from 'components/Checkout/CheckoutDetails';

const Checkout = (): JSX.Element => {
  useEffect(() => {
    logViewEvent();
  });

  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/shop/checkout/checkout', displayName: 'Checkout' },
    { urlPath: '/shop/checkout/cart', displayName: 'Cart' },
  ];

  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Checkout</title>
      </Head>

      <div className="shop-checkout">
        <ShopBreadcrumb
          rendering={{ componentName: '' }}
          params={{}}
          fields={{ items: breadCrumbDefinitions }}
        />
        <CheckoutDetails />
      </div>
    </ShopLayout>
  );
};

export default Checkout;
