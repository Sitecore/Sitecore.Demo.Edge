import Head from 'next/head';
import { useEffect } from 'react';
import { logViewEvent } from '../../services/CdpService';
import HeaderCdpMessageBar from '../../components/HeaderCdpMessageBar';
import Footer from '../../components/Navigation/Footer';
import Header from '../../components/Navigation/Header';
import MainNavigation from '../../components/Navigation/MainNavigation';
import {
  ExpandableDropDown,
  FeaturedProductHero,
  footerProps,
  headerProps,
  mainNavigationProps,
  ProductSearchBar,
} from '../../components/Products/Shop';

const Products = (): JSX.Element => {
  const searchBarProps = {
    reflektionProps: {
      didYouMean: ['Chocolate', 'Christmas', 'Christmas time', 'Car'],
      topCategories: ['Chocolate', 'Christmas', 'Christmas time', 'Car'],
      products: [
        {
          image_url: '/assets/img/shop/demo/41VNXF4HU6L.png',
          price: 255.99,
          sku: '28395',
        },
        {
          image_url: '/assets/img/shop/demo/41VNXF4HU6L-1.png',
          price: 255.99,
          sku: '234902',
        },
        {
          image_url: '/assets/img/shop/demo/41VNXF4HU6L-2.png',
          price: 255.99,
          sku: '3842',
        },
        {
          image_url: '/assets/img/shop/demo/41VNXF4HU6L.png',
          price: 255.99,
          sku: '29384',
        },
        {
          image_url: '/assets/img/shop/demo/41VNXF4HU6L-1.png',
          price: 255.99,
          sku: '203948',
        },
        {
          image_url: '/assets/img/shop/demo/41VNXF4HU6L-2.png',
          price: 255.99,
          sku: '23423',
        },
        {
          image_url: '/assets/img/shop/demo/41VNXF4HU6L.png',
          price: 255.99,
          sku: '7864',
        },
        {
          image_url: '/assets/img/shop/demo/41VNXF4HU6L-1.png',
          price: 255.99,
          sku: '743',
        },
        {
          image_url: '/assets/img/shop/demo/41VNXF4HU6L-2.png',
          price: 255.99,
          sku: '674',
        },
      ],
    },
  };

  const dropdownControls = [
    {
      title: 'Brand',
      dropdownItems: [
        { text: 'Alba', value: 'Alba' },
        { text: 'Striva', value: 'Striva' },
      ],
    },
    {
      title: 'Colors',
      dropdownItems: [
        { text: 'Black', value: 'Black' },
        { text: 'White', value: 'White' },
        { text: 'Silver', value: 'Silver' },
      ],
    },
    {
      title: 'Price',
      dropdownItems: [
        { text: '$0-$100', value: '1' },
        { text: '$101-$500', value: '2' },
        { text: '$501-$1000', value: '3' },
      ],
    },
    {
      title: 'Customer reviews',
      dropdownItems: [
        { text: '⭐', value: '1' },
        { text: '⭐⭐', value: '2' },
        { text: '⭐⭐⭐', value: '3' },
        { text: '⭐⭐⭐⭐', value: '4' },
        { text: '⭐⭐⭐⭐⭐', value: '5' },
      ],
    },
  ];

  useEffect(() => {
    logViewEvent();
  });

  return (
    <>
      <Head>
        <title>Play! Summit - Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Header {...headerProps} />
        <MainNavigation {...mainNavigationProps} />
      </header>
      <main>
        <HeaderCdpMessageBar />
        <div className="shop-container">
          <FeaturedProductHero subPageName="Products" />
          <section className="section">
            <div className="section__content container">
              <div id="shop-content-container">
                <div id="dropdown-container">
                  {dropdownControls.map((dropdown) => (
                    <ExpandableDropDown
                      key={dropdown.title}
                      title={dropdown.title}
                      items={dropdown.dropdownItems}
                      onClick={(value) => console.log(value)}
                    />
                  ))}
                </div>
                <ProductSearchBar reflektionProps={searchBarProps.reflektionProps} />
              </div>
            </div>
          </section>
          {/* TODO: add products listing grid */}
        </div>
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </>
  );
};

export default Products;
