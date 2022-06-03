import { RecommendationWidgetProps } from '@sitecore-discover/ui';
import RecommendedProducts from './RecommendedProducts';

interface RecentlyViewedProductsProps extends RecommendationWidgetProps {
  rfkId: string;
}

const RecentlyViewedProducts = (props: RecentlyViewedProductsProps): JSX.Element => (
  <RecommendedProducts {...props} title="Recently viewed products" />
);

export default RecentlyViewedProducts;
