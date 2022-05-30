import { RecommendationWidgetProps } from '@sitecore-discover/ui';
import RecommendedProducts from './RecommendedProducts';

interface SimilarProductsProps extends RecommendationWidgetProps {
  rfkId: string;
}

const SimilarProducts = (props: SimilarProductsProps): JSX.Element => (
  <RecommendedProducts {...props} title="Similar products" altTheme={true} />
);

export default SimilarProducts;
