import { setWidget, setCredentials, WidgetDataType } from '@sitecore-discover/react';
import FullPageSearch from '../components/FullPageSearch/FullPageSearch';
import PreviewSearch from '../components/PreviewSearch/PreviewSearch';
import { StorybookDiscoverComponentProps } from './DiscoverServiceFactory';
import { mockDiscoverData } from '../stories/mock-discover-data';

export const MockDiscoverService = (
  componentName: string,
  componentProps: Partial<StorybookDiscoverComponentProps>
): Partial<StorybookDiscoverComponentProps> => {
  setWidget('rfkid_7', {
    global: true,
    component: FullPageSearch,
    type: WidgetDataType.SEARCH_RESULTS,
  });

  setWidget('rfkid_6', {
    global: true,
    type: WidgetDataType.PREVIEW_SEARCH,
    component: PreviewSearch,
    options: {
      preRender: true,
      properties: {
        initial: {
          redirectUrl: '/shop/products?q=',
          inputQuerySelector: '#search-input',
        },
      },
    },
  });

  // Fake keys for Discover
  const DISCOVER_CUSTOMER_KEY = '11111-2222222';
  const DISCOVER_API_KEY = 'xxxxxxxxxxxxx';

  setCredentials({
    env: 'prod',
    customerKey: `${DISCOVER_CUSTOMER_KEY}`,
    apiKey: `${DISCOVER_API_KEY}`,
    useToken: true,
  });

  if (componentName === 'storybookLeftColumn') {
    componentProps = mockDiscoverData.leftColumnProps;
  } else if (componentName === 'storybookPreviewSearch') {
    componentProps = mockDiscoverData.previewSearchProps;
  } else if (componentName === 'storybookRightColumn') {
    componentProps = mockDiscoverData.rightColumnProps;
  } else if (componentName === 'storybookFacetList') {
    componentProps = mockDiscoverData.facetListProps;
  } else if (componentName === 'storybookFullPageSearch') {
    componentProps = mockDiscoverData.fullPageSearchProps;
  } else if (componentName === 'storybookSearchControls') {
    componentProps = mockDiscoverData.searchControlsProps;
  }
  return componentProps;
};
