import {
  setWidget,
  WidgetDataType,
  PageController,
  trackPageViewEvent,
} from '@sitecore-discover/react';
import CustomersAlsoBought from '../components/Widgets/CustomersAlsoBought';
import FullPageSearch from '../components/FullPageSearch/FullPageSearch';
import PreviewSearch from '../components/PreviewSearch/PreviewSearch';
import TrendingCategories from '../components/Widgets/TrendingCategories';
import SimilarProducts from '../components/Widgets/SimilarProducts';
import RecommendedForYou from '../components/Widgets/RecommendedForYou';
import TrendingProducts from '../components/Widgets/TrendingProducts';
import RecentlyViewedProducts from '../components/Widgets/RecentlyViewedProducts';
import DiscoverServiceConfig from './DiscoverServiceConfig';

export interface DiscoverReference {
  current: { contains: (eventTarget: EventTarget) => boolean };
}

export const updateDiscoverContext = (): void => {
  const context = PageController.getContext();
  context.setPageUri(window.location.pathname);
  trackPageViewEvent({
    page: {
      uri: context.getPageUri(),
    },
    user: {
      uuid: context.getUserUuid(),
    },
  });
};

export const DiscoverService = (): void => {
  const config = DiscoverServiceConfig();
  if (typeof window === 'undefined' || !config.customerKey || !config.apiKey) {
    return;
  }

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
      props: {
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
      props: {
        initial: {
          totalItems: 4,
        },
      },
    },
  });

  setWidget('rfkid_2', {
    component: TrendingProducts,
    type: WidgetDataType.RECOMMENDATION,
    options: {
      props: {
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
      props: {
        initial: {
          totalItems: 4,
        },
      },
    },
  });

  setWidget('rfkid_3', {
    component: RecentlyViewedProducts,
    type: WidgetDataType.RECOMMENDATION,
    options: {
      props: {
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
      props: {
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

  // Update the context page URI on route change
  const pushState = history.pushState;
  history.pushState = (...rest) => {
    pushState.apply(history, rest);
    updateDiscoverContext();
  };
};
