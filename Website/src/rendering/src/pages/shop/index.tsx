import Head from 'next/head';
import Footer, { FooterProps } from '../../components/Footer';
import Header, { HeaderProps } from '../../components/Header';
import MainNavigation, { MainNavigationProps } from '../../components/MainNavigation';
import {
  FeaturedProducts,
  ProductSearchBar,
  ShopByCategory,
  ShopByVendor,
} from '../../components/Shop';

const Shop = (): JSX.Element => {
  const categoryProps = {
    categories: [
      {
        categoryName: 'Workout',
        imageUrl: '/assets/img/shop/demo/shutterstock_276857315.png',
      },
      {
        categoryName: 'Golf',
        imageUrl: '/assets/img/shop/demo/shutterstock_276857315-1.png',
      },
      {
        categoryName: 'Mountain bike',
        imageUrl: '/assets/img/shop/demo/shutterstock_276857315-2.png',
      },
      {
        categoryName: 'Yoga',
        imageUrl: '/assets/img/shop/demo/shutterstock_276857315-3.png',
      },
    ],
  };

  const productProps = {
    products: [
      {
        imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
        price: 255.99,
      },
      {
        imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
        price: 255.99,
      },
      {
        imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
        price: 255.99,
      },
    ],
  };

  const vendorProps = {
    vendors: [
      {
        imageUrl: '/assets/img/shop/demo/RunRightThrough.png',
        vendorName: 'Alba',
      },
      {
        imageUrl: '/assets/img/shop/demo/Striva.png',
        vendorName: 'Striva',
      },
      {
        imageUrl: '/assets/img/shop/demo/SyndeyCummings.png',
        vendorName: 'CenterCycle',
      },
      {
        imageUrl: '/assets/img/shop/demo/RunRightThrough-1.png',
        vendorName: 'Run Right Through',
      },
      {
        imageUrl: '/assets/img/shop/demo/Striva-1.png',
        vendorName: 'Overunder',
      },
      {
        imageUrl: '/assets/img/shop/demo/SyndeyCummings-1.png',
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
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
        {
          imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
          price: 255.99,
        },
      ],
    },
  };

  const headerProps = {} as HeaderProps;

  const mainNavigationArgs = {
    fields: {
      data: {
        item: {
          headerLogo: {
            jsonValue: {
              value: {
                src: 'https://demoedge.sitecoresandbox.cloud/api/public/content/f9e7e50f21ce4f718e7967ac61633807?v=fc7a13bd',
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
                src: 'https://demoedge.sitecoresandbox.cloud/api/public/content/d86cdc4b1d1d478b8d1adc22f22cf8d5?v=b5a82bdd',
              },
            },
            alt: '',
          },
        },
      },
    },
  } as FooterProps;

  return (
    <>
      <Head>
        <title>Play! Summit - Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Header {...headerProps} />
        <MainNavigation {...mainNavigationArgs} />
      </header>
      <main>
        <div className="shop-container">
          <FeaturedProducts products={productProps.products} />
          <ProductSearchBar reflektionProps={searchBarProps.reflektionProps} />
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
