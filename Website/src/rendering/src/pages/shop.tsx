import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Shop = (props: ShopProps): JSX.Element => {
  const { productProps, categoryProps } = props;
  return (
    <div>
      <FeatureProducts products={productProps.products} />
      <ProductSearchBar />
      <ShopByCategory categories={categoryProps.categories} />
      <ShopByVendor />
      <FooterLinks />
    </div>
  );
};

const FeatureProducts = (props: FeatureProductsProps): JSX.Element => (
  <div>
    <div>
      <h4>Home &#62; Shop</h4>
      <h2>Featured Products</h2>
      <p>
        Road-test the world’s most trusted sports and fitness equipment–we’ll be welcoming 2,000
        brands at this year’s PLAY! Summit.
      </p>
    </div>
    <div>
      {props.products.map((product) => (
        <Product key={product.id} imageUrl={product.imageUrl} price={product.price} />
      ))}
    </div>
  </div>
);

const ProductSearchBar = (): JSX.Element => (
  <div>
    <FontAwesomeIcon icon={faSearch} />
    <input placeholder="Search for products"></input>
  </div>
);

const ShopByCategory = (props: ShopByCategoryProps): JSX.Element => (
  <div>
    <h2>Shop by category</h2>
    <div>
      {props.categories.map((category) => (
        <Category
          key={category.categoryName}
          imageUrl={category.imageUrl}
          categoryName={category.categoryName}
        />
      ))}
    </div>
    <button>View all categories</button>
  </div>
);

const ShopByVendor = (): JSX.Element => (
  <div>
    <h2>Shop by vendor</h2>
  </div>
);

const FooterLinks = (): JSX.Element => (
  <div>
    <h2>Links</h2>
  </div>
);

const Product = (props: ProductProps): JSX.Element => (
  <div>
    <img src={props.imageUrl} alt="Product image" />
    <div>
      <b>Product name</b>
      <p>Vendor name</p>
      <p>${props.price}</p>
    </div>
  </div>
);

const Category = (props: CategoryProps): JSX.Element => (
  <div>
    <img src={props.imageUrl} alt="Category image" />
    <p>{props.categoryName}</p>
  </div>
);

export default Shop;

// Interfaces

export interface ShopProps {
  categoryProps: ShopByCategoryProps;
  productProps: FeatureProductsProps;
}

export interface ProductProps {
  id: number;
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
