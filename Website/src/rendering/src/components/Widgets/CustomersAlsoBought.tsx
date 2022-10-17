import { widget, WidgetDataType } from '@sitecore-discover/react';
import RecommendedProducts from './RecommendedProducts';

interface CustomersAlsoBoughtProps {
  rfkId: string;
}

const CustomersAlsoBought = (props: CustomersAlsoBoughtProps): JSX.Element => (
  <RecommendedProducts {...props} title="Customers also bought" />
);

export default widget(CustomersAlsoBought, WidgetDataType.RECOMMENDATION);
