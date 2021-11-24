import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Shop = (props: ShopProps): JSX.Element => {
  const { productProps, categoryProps, vendorProps } = props;
  return (
    <div id="shop-container">
      <FeatureProducts products={productProps.products} />
      <ProductSearchBar />
      <ShopByCategory categories={categoryProps.categories} />
      <ShopByVendor vendorImageUrls={vendorProps.vendorImageUrls} />
      <FooterLinks />
    </div>
  );
};

const FeatureProducts = (props: FeatureProductsProps): JSX.Element => (
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
);

const ProductSearchBar = (): JSX.Element => (
  <div id="search-bar-container">
    <FontAwesomeIcon icon={faSearch} />
    <input id="search-input" placeholder="Search for products"></input>
  </div>
);

const ShopByCategory = (props: ShopByCategoryProps): JSX.Element => (
  <div id="shop-category-container">
    <h2>Shop by category</h2>
    <div id="categories-container">
      {props.categories.map((category) => (
        <Category
          key={category.categoryName}
          imageUrl={category.imageUrl}
          categoryName={category.categoryName}
        />
      ))}
    </div>
    <button id="view-all-button">View all categories</button>
  </div>
);

const ShopByVendor = (props: ShopByVendorProps): JSX.Element => (
  <div id="shop-by-vendor-container">
    <h2>Shop by vendor</h2>
    <div id="vendors-container">
      {props.vendorImageUrls.map((url) => (
        <img key={url} src={url} alt="Vendor image" />
      ))}
    </div>
    <button>View all vendors</button>
  </div>
);

const FooterLinks = (): JSX.Element => (
  <div id="footer-links-container">
    <h2>Links</h2>
  </div>
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
