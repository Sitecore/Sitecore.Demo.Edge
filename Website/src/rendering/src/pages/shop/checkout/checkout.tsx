import Head from 'next/head';
import Link from 'next/link';
import { ShopLayout } from 'components/Products/Shop';
import Breadcrumb from 'components/Navigation/ShopBreadcrumb';
import LineItemList from 'components/Checkout/LineItemList';
import GiftCheckboxOrder from 'components/Checkout/GiftCheckboxOrder';
import PromoInput from 'components/Checkout/PromoInput';
import useOcCurrentOrder from 'src/hooks/useOcCurrentOrder';

const Checkout = (): JSX.Element => {
  const { order } = useOcCurrentOrder();
  const breadCrumbDefinitions: Breadcrumb[] = [
    { urlPath: '/shop', displayName: 'Shop' },
    { urlPath: '/search', displayName: 'Search' },
  ];
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Cart</title>
      </Head>

      <Breadcrumb
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
      {<GiftCheckboxOrder order={order} />}
      {<PromoInput />}
      <div data-rfkid="rfkid_11"></div>
    </ShopLayout>
  );
};

export default Cart;
