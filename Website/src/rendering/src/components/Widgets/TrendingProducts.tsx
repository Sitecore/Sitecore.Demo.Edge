import { RecommendationWidgetProps } from '@sitecore-discover/ui';
import RecommendedProducts from './RecommendedProducts';

interface TrendingProductsProps extends RecommendationWidgetProps {
  rfkId: string;
}

const TrendingProducts = (props: TrendingProductsProps): JSX.Element => (
  <RecommendedProducts {...props} title="Trending products" />
);

export default TrendingProducts;
