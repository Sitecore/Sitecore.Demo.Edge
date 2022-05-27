import {
  init,
  setWidget,
  setCredentials,
  WidgetDataType,
  PageController,
} from '@sitecore-discover/react';
import CustomersAlsoBought from '../components/Widgets/CustomersAlsoBought';
import FullPageSearch from '../components/FullPageSearch/FullPageSearch';
import PreviewSearch from '../components/PreviewSearch/PreviewSearch';
import TrendingCategories from '../components/Widgets/TrendingCategories';
import SimilarProducts from '../components/Widgets/SimilarProducts';
import RecommendedForYou from '../components/Widgets/RecommendedForYou';

export interface DiscoverReference {
  current: { contains: (eventTarget: EventTarget) => boolean };
}

type DiscoverServiceOptions = {
  isStorybook?: boolean;
};

export const DiscoverService = (options?: DiscoverServiceOptions): void => {
  const DISCOVER_CUSTOMER_KEY = options?.isStorybook
    ? '0-0'
    : process.env.NEXT_PUBLIC_DISCOVER_CUSTOMER_KEY || '';
  const DISCOVER_API_KEY = options?.isStorybook
    ? '0-0-0'
    : process.env.NEXT_PUBLIC_DISCOVER_API_KEY || '';

  if (typeof window === 'undefined' || !DISCOVER_CUSTOMER_KEY || !DISCOVER_API_KEY) {
    return;
  }

  setCredentials({
    env: 'prod',
    customerKey: `${DISCOVER_CUSTOMER_KEY}`,
    apiKey: `${DISCOVER_API_KEY}`,
    useToken: true,
  });

  setWidget('rfkid_7', {
    component: FullPageSearch,
    type: WidgetDataType.SEARCH_RESULTS,
  });

  setWidget('rfkid_10', {
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

  setWidget('rfkid_31', {
    component: SimilarProducts,
    type: WidgetDataType.RECOMMENDATION,
    options: {
      properties: {
        initial: {
          totalItems: 4,
        },
      },
    },
  });

  setWidget('rfkid_1', {
    component: RecommendedForYou,
    type: WidgetDataType.RECOMMENDATION,
    options: {
      properties: {
        initial: {
          totalItems: 4,
        },
      },
    },
  });

  setWidget('rfkid_33', {
    component: CustomersAlsoBought,
    type: WidgetDataType.RECOMMENDATION,
    options: {
      properties: {
        initial: {
          totalItems: 4,
        },
      },
    },
  });

  setWidget('ps_trending_categories', {
    component: TrendingCategories,
    type: WidgetDataType.PREVIEW_SEARCH,
  });

  init();

  // Update the context page URI on route change
  const pushState = history.pushState;
  history.pushState = (...rest) => {
    pushState.apply(history, rest);
    const context = PageController.getContext();
    context.setPageUri(window.location.pathname);
  };
};
