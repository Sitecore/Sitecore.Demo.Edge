import { ReactElement } from 'react';
import Head from 'next/head';
import { ShopLayout } from '../../components/Products/Shop';
import ShopBreadcrumb, { ShopBreadcrumbItem } from '../../components/Navigation/ShopBreadcrumb';
import OrderHistory from '../../components/Account/OrderHistory';

const OrderHistoryPage = (): JSX.Element => {
  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/account/orders', displayName: 'Order history' },
    { urlPath: '/account', displayName: 'User profile' },
  ];

  return (
    <>
      <ShopBreadcrumb
        rendering={{ componentName: '' }}
        params={{}}
        fields={{ items: breadCrumbDefinitions }}
      />

      <OrderHistory />
    </>
  );
};

OrderHistoryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Order history</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default OrderHistoryPage;
