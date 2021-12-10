import Head from 'next/head';
import Footer, { FooterProps } from '../../components/Footer';
import Header, { HeaderProps } from '../../components/Header';
import MainNavigation, { MainNavigationProps } from '../../components/MainNavigation';
import { FeaturedProductHero, ProductSearchBar, ExpandableDropDown } from '../../components/Shop';

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
