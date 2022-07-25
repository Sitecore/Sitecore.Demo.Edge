import { RecommendationWidgetProps } from '@sitecore-discover/ui';
import { Product } from '../../models/discover/Product';
import ProductList from '../../components/ShopCommon/ProductList';

interface RecommendedProductsProps extends RecommendationWidgetProps {
  rfkId: string;
  title: string;
  altTheme?: boolean;
}

const RecommendedProducts = (props: RecommendedProductsProps): JSX.Element => {
  const { onProductClick, products, rfkID, title, loaded, loading, altTheme } = props;

  const handleProductClick = (product: Product) => {
    onProductClick({ sku: product.sku, rfkId: rfkID });
  };

  // TODO: Remove this when the Discover SDK allows us to configure a maximum number of products it returns.
  const firstFourProucts = products?.slice(0, 4);

  const themeClass = `recommended-products-title ${
    altTheme ? 'recommended-products-title-orange' : ''
  }`;

  const recommendedProducts = products?.length ? (
    <section className="section recommended-products">
      <div className="shop-container">
        <h3 className={themeClass}>{title}</h3>
        <ProductList
          products={firstFourProucts}
          loaded={loaded}
          loading={loading}
          onProductClick={handleProductClick}
          altTheme={altTheme}
        />
      </div>
    </section>
  ) : null;

  return recommendedProducts;
};

export default RecommendedProducts;
