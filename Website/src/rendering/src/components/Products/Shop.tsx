import { PropsWithChildren, ReactElement, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { faChevronDown, faSearch, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Section from '../PageContent/Section';
import ShopNavigation, { ShopNavigationProps } from '../Navigation/ShopNavigation';
import Footer, { FooterProps } from '../Navigation/Footer';
import HeaderCdpMessageBar from '../HeaderCdpMessageBar';
import { isCommerceEnabled } from '../../helpers/CommerceHelper';

export const ShopLayout = (props: PropsWithChildren<unknown>): JSX.Element => {
  const shopNavigationProps = {
    fields: {
      data: {
        item: {
          headerLogo: {
            jsonValue: {
              value: {
                // TODO update with play shop logo when available
                src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/83a458a1cb54401cab2308488bbd1031?v=bdb6447b&t=web',
              },
            },
            alt: '',
          },
        },
      },
    },
  } as ShopNavigationProps;

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

  // Show shop content if commerce is enabled, otherwise show error message
  const shopContent = isCommerceEnabled ? (
    <div className="shop-main-container">{props.children}</div>
  ) : (
    <p className="shop-integration-error">
      Shop pages are currently disabled because the commerce integration is not configured
    </p>
  );

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <ShopNavigation {...shopNavigationProps} />
      </header>
      <main>
        <HeaderCdpMessageBar />
        {shopContent}
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </>
  );
};

export const searchBarProps = {
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

type FeaturedProductHeroProps = {
  subPageName?: string;
};

export const FeaturedProductHero = (props: FeaturedProductHeroProps): JSX.Element => {
  const shopBreadcrumb = props.subPageName ? <Link href="/shop">Shop</Link> : <>Shop</>;
  const subPageBreadcrumb = props.subPageName && <> &#62; {props.subPageName}</>;

  return (
    <section className="section section-featured-products">
      <div className="section__content container">
        <div id="featured-products-container">
          <div id="products-left-container">
            <h4>
              <Link href="/">Home</Link> &#62; {shopBreadcrumb}
              {subPageBreadcrumb}
            </h4>
            <h2>CenterCycle Ratchet Kit</h2>
            <p>Small ratchet kit with a bag for your everyday bike travels and repairs.</p>
            <div className="add-to-cart">
              <Link href="/shop/product">
                <a className="btn--main btn--main--round">Add to cart</a>
              </Link>
            </div>
          </div>
          <div id="products-right-container">
            <img src="/assets/img/shop/demo/ratchet.png" alt="CenterCycle Ratchet Kit" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProductSearchBar = (props: SearchBarProps): JSX.Element => {
  const [popupVisible, setpopupVisible] = useState(false);
  return (
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
  );
};

export const Popup = (props: PopupProps): JSX.Element => {
  return props.visible ? <div id="popup-container">{props.children}</div> : <></>;
};

export const ReflektionContent = (props: ReflektionContentProps): JSX.Element => {
  return (
    <div id="reflektion-container">
      <div id="reflektion-left-container">
        <ul>
          <li>Did you mean?</li>
          {props.didYouMean.map((text) => (
            <li key={text}>
              <a href="#">{text}</a>
            </li>
          ))}
        </ul>
        <ul>
          <li>Top categories</li>
          {props.topCategories.map((text) => (
            <li key={text}>
              <a href="#">{text}</a>
            </li>
          ))}
        </ul>
      </div>
      <div id="reflektion-right-container">
        {props.products.map((product) => (
          <Product
            key={product.image_url}
            image_url={product.image_url}
            price={product.price}
            sku={product.sku}
          />
        ))}
      </div>
    </div>
  );
};

export const ShopByCategory = (props: ShopByCategoryProps): JSX.Element => (
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
      placeholders: {
        'jss-section-content': [],
      },
    }}
    params={{}}
  >
    <div className="shop-by-container">
      {props.categories.map((category, index) => (
        <Category key={index} {...category} />
      ))}
    </div>
  </Section>
);

export const ShopByVendor = (props: ShopByVendorProps): JSX.Element => (
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
      placeholders: {
        'jss-section-content': [],
      },
    }}
    params={{}}
  >
    <div className="shop-by-container shop-by-vendor-container">
      {props.vendors.map((vendor, index) => (
        <Vendor key={index} {...vendor} />
      ))}
    </div>
  </Section>
);

export const Product = (props: ProductProps): JSX.Element => (
  <div className="product">
    <Link href={`/shop/products/${props.sku}`}>
      <a>
        <img className="product-image" src={props.image_url} alt="Product image" />
        <div className="product-details">
          <b>{props.name || 'Product Name'}</b>
          <p>{props.vendor || 'Vendor Name'}</p>
          <p>${props.price}</p>
        </div>
      </a>
    </Link>
  </div>
);

export const Category = (props: CategoryProps): JSX.Element => (
  <Link href="/shop/products">
    <a>
      <div className="category">
        <img className="category-image" src={props.image_url} alt={props.categoryName} />
        <p className="item-name">{props.categoryName}</p>
      </div>
    </a>
  </Link>
);

export const Vendor = (props: VendorProps): JSX.Element => (
  <Link href="/shop/products">
    <a>
      <div>
        <img src={props.image_url} alt={props.vendorName} />
        <p className="item-name">{props.vendorName}</p>
      </div>
    </a>
  </Link>
);

export const ExpandableDropDown = (props: ExpandableDropDownProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="dropdown-container">
      <span className="dropdown-header" onClick={() => setExpanded(!expanded)}>
        <Text tag="p" field={{ value: props.title }} />
        <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} />
      </span>
      <ul
        className={expanded ? 'dropdown-items expanded' : 'dropdown-items'}
        style={{ height: expanded ? props.items.length * 40 : 0 }}
      >
        {props.items.map((item) => (
          <li key={item.text} className="dropdown-item">
            <span onClick={() => props.onClick(item.value)}>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Interfaces

export interface ProductProps {
  image_url: string;
  price: number;
  name?: string;
  vendor?: string;
  sku: string;
}

export interface CategoryProps {
  image_url: string;
  categoryName: string;
}

export interface ShopByCategoryProps {
  categories: CategoryProps[];
}

export interface VendorProps {
  image_url: string;
  vendorName: string;
}

export interface ShopByVendorProps {
  vendors: VendorProps[];
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

export interface DropdownItem {
  text: string;
  value: string;
}

export interface ClickDelegate {
  (value: string): void;
}

export interface ExpandableDropDownProps {
  items: DropdownItem[];
  title: string;
  onClick: ClickDelegate;
}
