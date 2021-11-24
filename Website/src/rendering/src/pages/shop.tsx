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
    <h2>Featured Products</h2>
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

export default Shop;
