import { ReactElement } from 'react';
import Script from 'next/script';
import FrequentlyPurchasedTogether from '../components/Widgets/FrequentlyPurchasedTogether';
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
  init(): void;
  widgets: Widgets;
  types: Types;
  ui: {
    html(...args: unknown[]): ReactElement<unknown, string>;
    useEffect(...args: unknown[]): void;
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
}

interface Types {
  PREVIEW_SEARCH: string;
  RECOMMENDATION: string;
}

declare global {
  interface Window {
    RFK: RFK;
  }
}

// ***** API *****

const DISCOVER_API_KEY = process.env.NEXT_PUBLIC_DISCOVER_API_KEY || '';
const DISCOVER_CUSTOMER_KEY = process.env.NEXT_PUBLIC_DISCOVER_CUSTOMER_KEY || '';
// const DISCOVER_CUSTOMER_KEY_SUFFIX = !!DISCOVER_CUSTOMER_KEY
//   ? DISCOVER_CUSTOMER_KEY.substring(DISCOVER_CUSTOMER_KEY.indexOf('-') + 1)
//   : '';
const isDiscoverConfigured = !!DISCOVER_API_KEY && !!DISCOVER_CUSTOMER_KEY;

export const DiscoverScripts: JSX.Element | undefined = isDiscoverConfigured ? (
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
        window.RFK.setWidget('ps_trending_categories', {
          type: window.RFK.types.PREVIEW_SEARCH,
          component: TrendingCategories,
        });
        window.RFK.init();
      }}
    />
  </>
) : undefined;
