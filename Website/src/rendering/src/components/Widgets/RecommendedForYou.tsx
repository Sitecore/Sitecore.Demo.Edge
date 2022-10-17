import { widget, WidgetDataType } from '@sitecore-discover/react';
import RecommendedProducts from './RecommendedProducts';

interface RecommendedForYouProps {
  rfkId: string;
}

const RecommendedForYou = (props: RecommendedForYouProps): JSX.Element => (
  <RecommendedProducts {...props} title="Recommended for you" />
);

export default widget(RecommendedForYou, WidgetDataType.RECOMMENDATION);
