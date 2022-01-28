import { faChevronDown, faSearch, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { ReactElement, useState } from 'react';

import Section from '../Page Content/Section';

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
        fields: {
          Value: {
            value: '',
          },
        },
      },
      brightness: {
        fields: {
          Value: {
            value: 'dark',
          },
        },
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
        fields: {
          Value: {
            value: ' ',
          },
        },
      },
      brightness: {
        fields: {
          Value: {
            value: 'light',
          },
        },
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
    <Link href="/shop/product">
      <a>
        <img className="product-image" src={props.imageUrl} alt="Product image" />
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
  imageUrl: string;
  price: number;
  name?: string;
  vendor?: string;
}

export interface CategoryProps {
  imageUrl: string;
  categoryName: string;
}

export interface ShopByCategoryProps {
  categories: CategoryProps[];
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
