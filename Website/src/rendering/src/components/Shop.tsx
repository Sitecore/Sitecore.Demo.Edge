import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import Section from './Section';

export const FeaturedProducts = (props: FeaturedProductsProps): JSX.Element => (
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

export const ProductSearchBar = (props: SearchBarProps): JSX.Element => {
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
    <Link href="/shop/product">
      <a>
        <img className="product-image" src={props.imageUrl} alt="Product image" />
        <div className="product-details">
          <b>Product name</b>
          <p>Vendor name</p>
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
        <img className="category-image" src={props.imageUrl} alt={props.categoryName} />
        <p className="item-name">{props.categoryName}</p>
      </div>
    </a>
  </Link>
);

export const Vendor = (props: VendorProps): JSX.Element => (
  <Link href="/shop/products">
    <a>
      <div>
        <img src={props.imageUrl} alt={props.vendorName} />
        <p className="item-name">{props.vendorName}</p>
      </div>
    </a>
  </Link>
);

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

export interface VendorProps {
  imageUrl: string;
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
