import { widget, WidgetDataType } from '@sitecore-discover/react';
import RecommendedProducts from './RecommendedProducts';

interface SimilarProductsProps {
  rfkId: string;
}

const SimilarProducts = (props: SimilarProductsProps): JSX.Element => (
  <RecommendedProducts {...props} title="Similar products" altTheme={true} />
);

export default widget(SimilarProducts, WidgetDataType.RECOMMENDATION);
