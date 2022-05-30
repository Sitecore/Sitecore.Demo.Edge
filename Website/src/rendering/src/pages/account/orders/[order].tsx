import { ReactElement } from 'react';
import Head from 'next/head';
import { ShopLayout } from '../../../components/Products/Shop';
import ShopBreadcrumb, { ShopBreadcrumbItem } from 'components/Navigation/ShopBreadcrumb';
import OrderDetails from '../../../components/Account/OrderDetails';

const OrderPage = (): JSX.Element => {
  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/account/orders', displayName: 'Order details' },
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

      <OrderDetails />
    </>
  );
};

OrderPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Order Details</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default OrderPage;
