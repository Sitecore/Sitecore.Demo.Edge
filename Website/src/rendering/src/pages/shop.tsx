const Shop = (): JSX.Element => (
  <div>
    <FeatureProducts />
    <ProductSearchBar />
    <ShopByCategory />
    <ShopByVendor />
    <FooterLinks />
  </div>
);

const FeatureProducts = (): JSX.Element => (
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
      <Product url="/assets/img/shop/helmet.jpeg" price="250.99" />
      <Product url="/assets/img/shop/helmet.jpeg" price="250.99" />
      <Product url="/assets/img/shop/helmet.jpeg" price="250.99" />
    </div>
  </div>
);

const ProductSearchBar = (): JSX.Element => (
  <div>
    <input placeholder="Search for products"></input>
  </div>
);

const ShopByCategory = (): JSX.Element => (
  <div>
    <h2>Shop by category</h2>
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
    <img src={props.url} alt="Product image" />
    <div>
      <b>Product name</b>
      <p>Vendor name</p>
      <p>${props.price}</p>
    </div>
  </div>
);

export default Shop;

// Interfaces

interface ProductProps {
  url: string;
  price: string;
}
