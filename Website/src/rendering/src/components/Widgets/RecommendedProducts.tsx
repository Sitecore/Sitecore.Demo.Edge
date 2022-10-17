import { useRecommendation } from '@sitecore-discover/react';
import { Product } from '../../models/discover/Product';
import ProductList from '../../components/ShopCommon/ProductList';

interface RecommendedProductsProps {
  rfkId: string;
  title: string;
  altTheme?: boolean;
}

const RecommendedProducts = ({ title, altTheme }: RecommendedProductsProps): JSX.Element => {
  const {
    actions: { onProductClick },
    queryResult: {
      isLoading,
      isFetching,
      data: { content: { product: { value: products = [] } = {} } = {} } = {},
    },
  } = useRecommendation((query) => {
    query.getRequest().setNumberProducts(4);
  });

  const handleProductClick = (product: Product) => {
    onProductClick({ sku: product.sku });
  };

  const themeClass = `recommended-products-title ${
    altTheme ? 'recommended-products-title-orange' : ''
  }`;

  const recommendedProducts = products?.length ? (
    <section className="section recommended-products">
      <div className="shop-container">
        <h3 className={themeClass}>{title}</h3>
        <ProductList
          products={products as unknown as Product[]}
          loaded={!isLoading}
          loading={isFetching}
          onProductClick={handleProductClick}
          altTheme={altTheme}
        />
      </div>
    </section>
  ) : null;

  return recommendedProducts;
};

export default RecommendedProducts;
