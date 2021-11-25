import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import { ReactElement, useState } from 'react';
import Footer, { FooterProps } from '../../components/Footer';
import Header, { HeaderProps } from '../../components/Header';
import MainNavigation, { MainNavigationProps } from '../../components/MainNavigation';
import Section from '../../components/Section';

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
    vendorImageUrls: [
      '/assets/img/shop/demo/RunRightThrough.png',
      '/assets/img/shop/demo/Striva.png',
      '/assets/img/shop/demo/SyndeyCummings.png',
      '/assets/img/shop/demo/RunRightThrough-1.png',
      '/assets/img/shop/demo/Striva-1.png',
      '/assets/img/shop/demo/SyndeyCummings-1.png',
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
        <div id="shop-container">
          <FeaturedProducts products={productProps.products} />
          <ProductSearchBar reflektionProps={searchBarProps.reflektionProps} />
          <ShopByCategory categories={categoryProps.categories} />
          <ShopByVendor vendorImageUrls={vendorProps.vendorImageUrls} />
        </div>
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </>
  );
};

const FeaturedProducts = (props: FeaturedProductsProps): JSX.Element => (
  <section className="section section-featured-products">
    <div className="section__content container">
      <div id="featured-products-container">
        <div id="products-left-container">
          <h4>Home &#62; Shop</h4>
          <h2>Featured Products</h2>
          <p>
            Road-test the world’s most trusted sports and fitness equipment–we’ll be welcoming 2,000
            brands at this year’s PLAY! Summit.
          </p>
        </div>
        <div id="products-right-container">
          {props.products.map((product) => (
            <Product key={product.imageUrl} imageUrl={product.imageUrl} price={product.price} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ProductSearchBar = (props: SearchBarProps): JSX.Element => {
  const [popupVisible, setpopupVisible] = useState(false);
  return (
    <section className="section">
      <div className="section__content container">
        <div id="search-input-container">
          <FontAwesomeIcon id="search-icon" icon={faSearch} />
          <input
            id="search-input"
            onFocus={() => setpopupVisible(true)}
            onBlur={() => setpopupVisible(false)}
            placeholder="Search for products"
          ></input>
          <Popup visible={popupVisible}>
            <ReflektionContent {...props.reflektionProps} />
          </Popup>
        </div>
      </div>
    </section>
  );
};

const Popup = (props: PopupProps): JSX.Element => {
  return props.visible ? <div id="popup-container">{props.children}</div> : <></>;
};

const ReflektionContent = (props: ReflektionContentProps): JSX.Element => {
  return (
    <div id="reflektion-container">
      <div id="reflektion-left-container">
        <ul>
          <li>Did you mean?</li>
          {props.didYouMean.map((text) => (
            <li key={text}>
              <a href="javascript:void(0)">{text}</a>
            </li>
          ))}
        </ul>
        <ul>
          <li>Top categories</li>
          {props.topCategories.map((text) => (
            <li key={text}>
              <a href="javascript:void(0)">{text}</a>
            </li>
          ))}
        </ul>
      </div>
      <div id="reflektion-right-container">
        {props.products.map((product) => (
          <Product key={product.imageUrl} imageUrl={product.imageUrl} price={product.price} />
        ))}
      </div>
    </div>
  );
};

const ShopByCategory = (props: ShopByCategoryProps): JSX.Element => (
  <Section
    fields={{
      cssClass: {
        value: '',
      },
      brightness: {
        value: 'dark',
      },
      title: {
        value: 'Shop by category',
      },
      content: {
        value: ' ',
      },
      callToActionLink: {
        value: {
          href: '/shop/products',
          text: 'View all products',
        },
      },
    }}
    rendering={{
      componentName: '',
    }}
    params={{}}
  >
    <div id="categories-container">
      {props.categories.map((category) => (
        <Category
          key={category.categoryName}
          imageUrl={category.imageUrl}
          categoryName={category.categoryName}
        />
      ))}
    </div>
  </Section>
);

const ShopByVendor = (props: ShopByVendorProps): JSX.Element => (
  <Section
    fields={{
      cssClass: {
        value: ' ',
      },
      brightness: {
        value: 'light',
      },
      title: {
        value: 'Shop by vendor',
      },
      content: {
        value: '',
      },
      callToActionLink: {
        value: {
          href: '/shop/products',
          text: 'View all products',
        },
      },
    }}
    rendering={{
      componentName: '',
    }}
    params={{}}
  >
    {/* TODO: Add vendor names under images */}
    <div id="categories-container">
      {props.vendorImageUrls.map((url) => (
        <img key={url} src={url} alt="Vendor image" />
      ))}
    </div>
  </Section>
);

const Product = (props: ProductProps): JSX.Element => (
  <div className="product">
    <img className="product-image" src={props.imageUrl} alt="Product image" />
    <div className="product-details">
      <b>Product name</b>
      <p>Vendor name</p>
      <p>${props.price}</p>
    </div>
  </div>
);

const Category = (props: CategoryProps): JSX.Element => (
  <div className="category">
    <img className="category-image" src={props.imageUrl} alt="Category image" />
    <p className="category-name">{props.categoryName}</p>
  </div>
);

export default Shop;

// Interfaces

export interface ProductProps {
  imageUrl: string;
  price: number;
}

export interface CategoryProps {
  imageUrl: string;
  categoryName: string;
}

export interface ShopByCategoryProps {
  categories: CategoryProps[];
}

export interface FeaturedProductsProps {
  products: ProductProps[];
}

export interface ShopByVendorProps {
  vendorImageUrls: string[];
}

export interface PopupProps {
  children: ReactElement;
  visible: boolean;
}

export interface ReflektionContentProps {
  products: ProductProps[];
  didYouMean: string[];
  topCategories: string[];
}

export interface SearchBarProps {
  reflektionProps: ReflektionContentProps;
}
