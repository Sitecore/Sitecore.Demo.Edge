import Head from 'next/head';
import Link from 'next/link';
import { ShopLayout } from 'components/Products/Shop';
import ShopBreadcrumb, { ShopBreadcrumbItem } from 'components/Navigation/ShopBreadcrumb';
import LineItemList from 'components/Checkout/LineItemList';
import GiftCheckboxOrder from 'components/Checkout/GiftCheckboxOrder';
import PromoInput from 'components/Checkout/PromoInput';
import useOcCurrentOrder from 'src/hooks/useOcCurrentOrder';

interface CartProps {
  loading?: boolean;
  loaded?: boolean;
  // title?: string;
  products?: unknown[];
  dispatch?: () => unknown;
}

const Cart = (props: CartProps): JSX.Element => {
  const { order } = useOcCurrentOrder();
  const breadCrumbDefinitions: ShopBreadcrumbItem[] = [
    { urlPath: '/shop', displayName: 'Shop' },
    { urlPath: '/cart', displayName: 'Cart' },
  ];
  return (
    <ShopLayout>
      {console.log({ props })}
      <Head>
        <title>PLAY! SHOP - Cart</title>
      </Head>

      <ShopBreadcrumb
        rendering={{ componentName: '' }}
        params={{}}
        fields={{ items: breadCrumbDefinitions }}
      />
      <h1>Your Shopping Cart</h1>
      <LineItemList editable={true} />
      <div>
        <Link href="/shop/checkout/quick-checkout">
          <a>Go to Checkout</a>
        </Link>
      </div>
      <GiftCheckboxOrder order={order} />
      <PromoInput />
      <div data-rfkid="rfkid_11"></div>
    </ShopLayout>
  );
};

export default Cart;
