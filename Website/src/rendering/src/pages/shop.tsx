import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Section from '../components/Section';
import { ReactElement } from 'react';
import { useState } from '@storybook/addons';

const Shop = (props: ShopProps): JSX.Element => {
  const { productProps, categoryProps, vendorProps, searchBarProps } = props;
  return (
    <div id="shop-container">
      <FeatureProducts products={productProps.products} />
      <ProductSearchBar reflektionProps={searchBarProps.reflektionProps} />
      <ShopByCategory categories={categoryProps.categories} />
      <ShopByVendor vendorImageUrls={vendorProps.vendorImageUrls} />
    </div>
  );
};

const FeatureProducts = (props: FeatureProductsProps): JSX.Element => (
  <section className="section">
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
  // const [popupVisible, setpopupVisible] = useState(false);
  return (
    <section className="section">
      <div className="section__content container">
        <div id="search-input-container">
          <FontAwesomeIcon id="search-icon" icon={faSearch} />
          <input
            id="search-input"
            // onFocus={() => setpopupVisible(true)}
            // onBlur={() => setpopupVisible(false)}
            placeholder="Search for products"
          ></input>
          <Popup visible={true}>
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
      brightness: {
        value: 'dark',
      },
      title: {
        value: 'Shop by category',
      },
      callToActionLink: {
        value: {
          href: '/shop/categories',
          text: 'View all categories',
        },
      },
    }}
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
      brightness: {
        value: 'light',
      },
      title: {
        value: 'Shop by vendor',
      },
      callToActionLink: {
        value: {
          href: '/shop/vendors',
          text: 'View all vendors',
        },
      },
    }}
  >
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

export interface ShopProps {
  categoryProps: ShopByCategoryProps;
  productProps: FeatureProductsProps;
  vendorProps: ShopByVendorProps;
  searchBarProps: SearchBarProps;
}

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

export interface FeatureProductsProps {
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
