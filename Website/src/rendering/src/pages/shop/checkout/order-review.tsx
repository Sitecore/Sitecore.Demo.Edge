import { useEffect } from 'react';
import Head from 'next/head';
import { logViewEvent } from 'src/services/CdpService';
import { ShopLayout } from 'components/Products/Shop';
import ShopBreadcrumb, { ShopBreadcrumbItem } from 'components/Navigation/ShopBreadcrumb';
import OrderReviewDetails from 'components/Checkout/OrderReviewDetails';

const OrderReview = (): JSX.Element => {
  useEffect(() => {
    logViewEvent();
  });

  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/shop/checkout/order-review', displayName: 'Review order' },
    { urlPath: '/shop/checkout/checkout', displayName: 'Checkout' },
    { urlPath: '/shop/checkout/cart', displayName: 'Cart' },
    { urlPath: '/shop', displayName: 'Shop' },
  ];

  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Order Review</title>
      </Head>

      <ShopBreadcrumb
        rendering={{ componentName: '' }}
        params={{}}
        fields={{ items: breadCrumbDefinitions }}
      />

      <OrderReviewDetails />
    </ShopLayout>
  );
};

export default OrderReview;
