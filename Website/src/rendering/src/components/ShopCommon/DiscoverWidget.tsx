import { Widget } from '@sitecore-discover/react';

type DiscoverWidgetProps = {
  rfkId: string;
};

const DiscoverWidget = (props: DiscoverWidgetProps): JSX.Element => {
  return typeof window !== 'undefined' && <Widget {...props} />;
};

export default DiscoverWidget;
