import { Widget } from '@sitecore-discover/react';
import { isCommerceEnabled } from '../../helpers/CommerceHelper';

type DiscoverWidgetProps = {
  rfkId: string;
};

const DiscoverWidget = (props: DiscoverWidgetProps): JSX.Element => {
  return typeof window !== 'undefined' && isCommerceEnabled && <Widget {...props} />;
};

export default DiscoverWidget;
