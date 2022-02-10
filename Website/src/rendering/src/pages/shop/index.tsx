import Head from 'next/head';
import { useEffect } from 'react';
import { logViewEvent } from '../../services/CdpService';
import HeaderCdpMessageBar from '../../components/HeaderCdpMessageBar';
import Footer from '../../components/Navigation/Footer';
import Header from '../../components/Navigation/Header';
import MainNavigation from '../../components/Navigation/MainNavigation';
import {
  FeaturedProductHero,
  footerProps,
  headerProps,
  mainNavigationProps,
  ProductSearchBar,
  ShopByCategory,
  ShopByVendor,
} from '../../components/Products/Shop';

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

  const searchBarProps = {
    reflektionProps: {
      didYouMean: ['Chocolate', 'Christmas', 'Christmas time', 'Car'],
      topCategories: ['Chocolate', 'Christmas', 'Christmas time', 'Car'],
      products: [
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
          sku: '28395',
        },
      ],
    },
  };

  useEffect(() => {
    logViewEvent();
  });

  return (
    <>
      <Head>
        <title>Play! Summit - Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Header {...headerProps} />
        <MainNavigation {...mainNavigationProps} />
      </header>
      <main>
        <HeaderCdpMessageBar />
        <div className="shop-container">
          <FeaturedProductHero />
          <section className="section">
            <div className="section__content container">
              <input
                data-rfkid="hs_ps"
                data-cssid="hosted-sb"
                className="rfk_sb flex__1 border__input padding__input search"
                type="text"
                autoComplete="off"
                placeholder="What can we help you find today?"
              />
              <ProductSearchBar reflektionProps={searchBarProps.reflektionProps} />
            </div>
          </section>
          <div data-rfkid="hs_sr" data-keyphrase="SAMPLE KEYPHRASE"></div>
          <div data-rfkid="hs_sr" data-keyphrase=""></div>
          <ShopByCategory categories={categoryProps.categories} />
          <ShopByVendor vendors={vendorProps.vendors} />
        </div>
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </>
  );
};

export default Shop;
