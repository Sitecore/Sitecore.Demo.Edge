import { RecommendationWidgetProps } from '@sitecore-discover/ui';
import RecommendedProducts from './RecommendedProducts';

interface SimilarProductsProps extends RecommendationWidgetProps {
  rfkId: string;
}

const FeaturedProducts = (props: SimilarProductsProps): JSX.Element => (
  <RecommendedProducts {...props} title="Featured products" altTheme={true} />
);

export default FeaturedProducts;
