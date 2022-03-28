import Head from 'next/head';
import { ShopLayout } from 'components/Products/Shop';
import ShopBreadcrumb, { ShopBreadcrumbItem } from 'components/Navigation/ShopBreadcrumb';
import CartDetails from 'components/Checkout/CartDetails';

const Cart = (): JSX.Element => {
  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/shop', displayName: 'Shop' },
    { urlPath: '/cart', displayName: 'Cart' },
  ];
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Cart</title>
      </Head>

      <ShopBreadcrumb
        rendering={{ componentName: '' }}
        params={{}}
        fields={{ items: breadCrumbDefinitions }}
      />
      <CartDetails editable={true} />
      <div data-rfkid="rfkid_11"></div>
    </ShopLayout>
  );
};

export default Cart;
