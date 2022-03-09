import Head from 'next/head';
import { useEffect } from 'react';
import { logViewEvent } from '../../services/CdpService';
import {
  FeaturedProductHero,
  ProductSearchBar,
  ShopByCategory,
  ShopByVendor,
  ShopLayout,
} from '../../components/Products/Shop';
import FrequentlyPurchasedTogether from 'components/Widgets/FrequentlyPurchasedTogether';
import SearchResults from 'components/FullPageSearch/FullPageSearch';

const Shop = (): JSX.Element => {
  const categoryProps = {
    categories: [
      {
        categoryName: 'Workout',
        image_url: '/assets/img/shop/demo/shutterstock_276857315.png',
      },
      {
        categoryName: 'Golf',
        image_url: '/assets/img/shop/demo/shutterstock_276857315-1.png',
      },
      {
        categoryName: 'Mountain bike',
        image_url: '/assets/img/shop/demo/shutterstock_276857315-2.png',
      },
      {
        categoryName: 'Yoga',
        image_url: '/assets/img/shop/demo/shutterstock_276857315-3.png',
      },
    ],
  };

  const vendorProps = {
    vendors: [
      {
        image_url: '/assets/img/shop/demo/RunRightThrough.png',
        vendorName: 'Alba',
      },
      {
        image_url: '/assets/img/shop/demo/Striva.png',
        vendorName: 'Striva',
      },
      {
        image_url: '/assets/img/shop/demo/SyndeyCummings.png',
        vendorName: 'CenterCycle',
      },
      {
        image_url: '/assets/img/shop/demo/RunRightThrough-1.png',
        vendorName: 'Run Right Through',
      },
      {
        image_url: '/assets/img/shop/demo/Striva-1.png',
        vendorName: 'Overunder',
      },
      {
        image_url: '/assets/img/shop/demo/SyndeyCummings-1.png',
        vendorName: 'Sydney Cummings',
      },
    ],
  };

  useEffect(() => {
    logViewEvent();
  });

  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP</title>
      </Head>
      <div data-rfkid="rfkid_7"></div>
      <FeaturedProductHero />
      <section className="section">
        {/* <div
          data-rfkid="rfkid_6"
          className="section__content container"
          style={{ position: 'relative', height: 30 }}
        >
          <input id="search-input" type="text" />
        </div> */}
        <div className="section__content container">
          <ProductSearchBar />
        </div>
      </section>
      <div data-rfkid="hs_sr" data-keyphrase="SAMPLE KEYPHRASE"></div>
      <div data-rfkid="hs_sr" data-keyphrase=""></div>
      <ShopByCategory categories={categoryProps.categories} />
      <ShopByVendor vendors={vendorProps.vendors} />
    </ShopLayout>
  );
};

export default Shop;
