import { ReactElement, useEffect } from 'react';
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
    { urlPath: '/shop/checkout/order-review', displayName: 'Order review' },
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

      <OrderReviewDetails />
    </>
  );
};

OrderReview.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Order Review</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default OrderReview;
