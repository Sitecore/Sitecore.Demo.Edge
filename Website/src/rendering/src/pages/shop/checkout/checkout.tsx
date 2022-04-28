import Head from 'next/head';
import { ShopLayout } from 'components/Products/Shop';
import ShopBreadcrumb, { ShopBreadcrumbItem } from 'components/Navigation/ShopBreadcrumb';
import CheckoutDetails from 'components/Checkout/CheckoutDetails';

const Checkout = (): JSX.Element => {
  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/shop/checkout/checkout', displayName: 'Checkout' },
    { urlPath: '/shop/checkout/cart', displayName: 'Cart' },
  ];

  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Checkout</title>
      </Head>

      <ShopBreadcrumb
        rendering={{ componentName: '' }}
        params={{}}
        fields={{ items: breadCrumbDefinitions }}
      />
      <CheckoutDetails />
    </ShopLayout>
  );
};

export default Checkout;
