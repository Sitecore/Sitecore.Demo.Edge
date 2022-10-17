import { widget, WidgetDataType } from '@sitecore-discover/react';
import RecommendedProducts from './RecommendedProducts';

interface RecentlyViewedProductsProps {
  rfkId: string;
}

const RecentlyViewedProducts = (props: RecentlyViewedProductsProps): JSX.Element => (
  <RecommendedProducts {...props} title="Recently viewed products" />
);

export default widget(RecentlyViewedProducts, WidgetDataType.RECOMMENDATION);
