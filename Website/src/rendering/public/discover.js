import {
  init,
  setWidget,
  setCredentials,
  setWidgetType,
  WidgetDataType,
} from '@sitecore-discover/react';
import FullPageSearch from 'components/FullPageSearch/FullPageSearch';
import PreviewSearch from 'components/PreviewSearch/PreviewSearch';

setWidgetType(WidgetDataType.SEARCH_RESULTS, {
  component: FullPageSearch,
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

setCredentials({
  env: 'prod',
  customerKey: `${process.env.NEXT_PUBLIC_DISCOVER_CUSTOMER_KEY}`,
  apiKey: `${process.env.NEXT_PUBLIC_DISCOVER_API_KEY}`,
  useToken: true,
});

init();