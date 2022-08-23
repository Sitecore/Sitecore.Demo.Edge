import { Widget } from '@sitecore-discover/react';
import { isDiscoverEnabled } from '../../services/DiscoverService';

type DiscoverWidgetProps = {
  rfkId: string;
};

const DiscoverWidget = (props: DiscoverWidgetProps): JSX.Element => {
  return typeof window !== 'undefined' && isDiscoverEnabled && <Widget {...props} />;
};

export default DiscoverWidget;
