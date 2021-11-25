import Head from 'next/head';
import Footer, { FooterProps } from '../../components/Footer';
import Header, { HeaderProps } from '../../components/Header';
import MainNavigation, { MainNavigationProps } from '../../components/MainNavigation';
import { FeaturedProducts, ProductSearchBar } from '../../components/Shop';

const Products = (): JSX.Element => {
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
        <title>Play! Summit - Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Header {...headerProps} />
        <MainNavigation {...mainNavigationArgs} />
      </header>
      <main>
        <div className="shop-container">
          {/* TODO: Replace the hero by the Mountain bike category hero from mockup */}
          <FeaturedProducts products={productProps.products} />
          <ProductSearchBar reflektionProps={searchBarProps.reflektionProps} />
          {/* TODO: Add facets, move search box, add products listing grid */}
        </div>
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </>
  );
};

export default Products;
