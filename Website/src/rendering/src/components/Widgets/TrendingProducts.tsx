import { widget, WidgetDataType } from '@sitecore-discover/react';
import RecommendedProducts from './RecommendedProducts';

interface TrendingProductsProps {
  rfkId: string;
}

const TrendingProducts = (props: TrendingProductsProps): JSX.Element => (
  <RecommendedProducts {...props} title="Trending products" />
);

export default widget(TrendingProducts, WidgetDataType.RECOMMENDATION);
