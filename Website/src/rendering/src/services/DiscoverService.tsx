import { ReactElement } from 'react';
import Script from 'next/script';
import FrequentlyPurchasedTogether from '../components/Widgets/FrequentlyPurchasedTogether';
import PreviewSearch from '../components/PreviewSearch/PreviewSearch';
import FullPageSearch from '../components/FullPageSearch/FullPageSearch';
import TrendingCategories from '../components/Widgets/TrendingCategories';

// ***** TYPES *****

interface RFK {
  setCredentials(
    // eslint-disable-next-line no-unused-vars
    credentials: Record<string, unknown>
  ): void;
  setWidget(
    // eslint-disable-next-line no-unused-vars
    id: string,
    // eslint-disable-next-line no-unused-vars
    options: Record<string, unknown>
  ): void;
  setWidgetType(id: string, component: unknown): void;
  init(): void;
  widgets: Widgets;
  types: Types;
  ui: {
    html(...args: unknown[]): ReactElement<unknown, string>;
    useRef(...args: unknown[]): DiscoverReference;
    useEffect(...args: unknown[]): void;
    useState(arg1: boolean): [lock: boolean, setLock: (shouldSetLock: boolean) => void];
    useCallback(...args: unknown[]): (...args: unknown[]) => void;
  };
}

interface Widgets {
  PreviewSearchActions: {
    CATEGORY_CHANGED: string;
    KEYPHRASE_CHANGED: string;
    TRENDING_CATEGORY_CHANGED: string;
    SUGGESTION_CHANGED: string;
  };
  SearchResultsActions: {
    KEYPHRASE_CHANGED: unknown;
    FACET_CLICKED: unknown;
    CLEAR_FILTERS: unknown;
    RESULTS_PER_PAGE_CHANGED: unknown;
    PAGE_NUMBER_CHANGED: unknown;
    SORT_CHANGED: unknown;
    PRODUCT_CLICKED: unknown;
  };
}

interface Types {
  PREVIEW_SEARCH: string;
  SEARCH_RESULTS: string;
  RECOMMENDATION: string;
}

export interface DiscoverReference {
  current: { contains: (eventTarget: EventTarget) => boolean };
}

declare global {
  interface Window {
    RFK: RFK;
    location: Location;
  }
}

// ***** API *****

const DISCOVER_API_KEY = process.env.NEXT_PUBLIC_DISCOVER_API_KEY || '';

const DISCOVER_CUSTOMER_KEY = process.env.NEXT_PUBLIC_DISCOVER_CUSTOMER_KEY || '';
// const DISCOVER_CUSTOMER_KEY_SUFFIX = !!DISCOVER_CUSTOMER_KEY
//   ? DISCOVER_CUSTOMER_KEY.substring(DISCOVER_CUSTOMER_KEY.indexOf('-') + 1)
//   : '';

export const DiscoverScripts: JSX.Element = (
  <>
    {/* Beacon for old integration way */}
    {/* <Script
      src={`https://${DISCOVER_CUSTOMER_KEY_SUFFIX}-prod.rfksrv.com/rfk/js/${DISCOVER_CUSTOMER_KEY}/init.js`}
      strategy="lazyOnload"
    /> */}

    {/* SDK for new integration way */}
    {/* Temporary source for the Discover SDK until it is released on NPM */}
    <Script
      src="/rfk-sdk.js"
      onLoad={() => {
        window.RFK.setCredentials({
          env: 'prod',
          customerKey: `${DISCOVER_CUSTOMER_KEY}`,
          apiKey: `${DISCOVER_API_KEY}`,
          useToken: true,
        });
        window.RFK.setWidget('rfkid_11', {
          type: 'recommendation',
          component: FrequentlyPurchasedTogether,
        });
        window.RFK.setWidgetType(window.RFK.types.PREVIEW_SEARCH, {
          component: PreviewSearch,
        });
        window.RFK.setWidgetType(window.RFK.types.SEARCH_RESULTS, {
          component: FullPageSearch,
        });
        window.RFK.setWidget('rfkid_6', {
          type: window.RFK.types.PREVIEW_SEARCH,
          global: true,
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
        window.RFK.setWidget('ps_trending_categories', {
          type: window.RFK.types.PREVIEW_SEARCH,
          component: TrendingCategories,
        });
        window.RFK.init();
        const pushState = history.pushState;
        history.pushState = (...rest) => {
          pushState.apply(history, rest);
          setTimeout(() => {
            window.RFK.init();
          }, 0);
        };
      }}
    />
  </>
);
