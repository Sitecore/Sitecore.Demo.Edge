import { RecommendationWidgetProps } from '@sitecore-discover/ui';
import RecommendedProducts from './RecommendedProducts';

interface GeoBasedProductProps extends RecommendationWidgetProps {
  rfkId: string;
}

const GeoBasedProducts = (props: GeoBasedProductProps): JSX.Element => (
  <RecommendedProducts {...props} title="Recommended based on your location" />
);

export default GeoBasedProducts;
