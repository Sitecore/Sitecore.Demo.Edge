import { RecommendationWidgetProps } from '@sitecore-discover/ui';
import { Product } from '../../models/discover/Product';
import ProductList from '../../components/ShopCommon/ProductList';

interface RecommendedProductsProps extends RecommendationWidgetProps {
  rfkId: string;
  title: string;
}

const RecommendedProducts = (props: RecommendedProductsProps): JSX.Element => {
  const { onProductClick, products, rfkID, title, loaded, loading, altTheme } = props;

  const handleProductClick = (product: Product) => {
    onProductClick({ sku: product.sku, rfkId: rfkID });
  };

  const recommendedProducts = products?.length ? (
    <section className="section recommended-products">
      <div className="shop-container">
        <h3 className="recommended-products-title">{title}</h3>
        <ProductList
          products={products}
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
