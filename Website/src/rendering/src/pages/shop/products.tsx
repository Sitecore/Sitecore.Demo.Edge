import Head from 'next/head';
import { useEffect } from 'react';
import { logViewEvent } from 'src/services/CdpService';
import HeaderCdpMessageBar from '../../components/HeaderCdpMessageBar';
import Footer, { FooterProps } from '../../components/Navigation/Footer';
import Header, { HeaderProps } from '../../components/Navigation/Header';
import MainNavigation, { MainNavigationProps } from '../../components/Navigation/MainNavigation';
import {
  ExpandableDropDown,
  FeaturedProductHero,
  ProductSearchBar,
} from '../../components/Products/Shop';

const Products = (): JSX.Element => {
  const searchBarProps = {
    reflektionProps: {
      didYouMean: ['Chocolate', 'Christmas', 'Christmas time', 'Car'],
      topCategories: ['Chocolate', 'Christmas', 'Christmas time', 'Car'],
      products: [
        {
          imageUrl: '/assets/img/shop/demo/41VNXF4HU6L.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/41VNXF4HU6L-1.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/41VNXF4HU6L-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/41VNXF4HU6L.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/41VNXF4HU6L-1.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/41VNXF4HU6L-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/41VNXF4HU6L.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/41VNXF4HU6L-1.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/41VNXF4HU6L-2.png',
          price: 255.99,
        },
      ],
    },
  };

  const headerProps = {
    rendering: {
      placeholders: {
        'jss-header-content': [],
      },
    },
  } as unknown as HeaderProps;

  const mainNavigationArgs = {
    fields: {
      data: {
        item: {
          headerLogo: {
            jsonValue: {
              value: {
                src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/83a458a1cb54401cab2308488bbd1031?v=bdb6447b&t=web',
              },
            },
            alt: '',
          },
        },
      },
    },
  } as MainNavigationProps;

  const footerProps = {
    fields: {
      data: {
        item: {
          footerLogo: {
            jsonValue: {
              value: {
                src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/c78f4095acc746a98146aaa38f57a04f?v=85bba949&t=web',
                width: 413,
                height: 113,
              },
            },
            alt: '',
          },
        },
      },
    },
  } as unknown as FooterProps;

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
        <MainNavigation {...mainNavigationArgs} />
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
