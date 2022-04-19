import { init, setWidget, setCredentials, WidgetDataType } from '@sitecore-discover/react';
import FrequentlyPurchasedTogether from '../components/Widgets/FrequentlyPurchasedTogether';
import FullPageSearch from '../components/FullPageSearch/FullPageSearch';
import PreviewSearch from '../components/PreviewSearch/PreviewSearch';
import TrendingCategories from '../components/Widgets/TrendingCategories';

export interface DiscoverReference {
  current: { contains: (eventTarget: EventTarget) => boolean };
}

export const DiscoverService = (): void => {
  setWidget('rfkid_7', {
    component: FullPageSearch,
    type: WidgetDataType.SEARCH_RESULTS,
  });

  setWidget('rfkid_6', {
    component: PreviewSearch,
    type: WidgetDataType.PREVIEW_SEARCH,
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

  setWidget('rfkid_11', {
    type: WidgetDataType.RECOMMENDATION,
    component: FrequentlyPurchasedTogether,
  });

  setWidget('ps_trending_categories', {
    type: WidgetDataType.PREVIEW_SEARCH,
    component: TrendingCategories,
  });

  const DISCOVER_CUSTOMER_KEY = process.env.NEXT_PUBLIC_DISCOVER_CUSTOMER_KEY || '';
  const DISCOVER_API_KEY = process.env.NEXT_PUBLIC_DISCOVER_API_KEY || '';

  setCredentials({
    env: 'prod',
    customerKey: `${DISCOVER_CUSTOMER_KEY}`,
    apiKey: `${DISCOVER_API_KEY}`,
    useToken: true,
  });

  init();
};
