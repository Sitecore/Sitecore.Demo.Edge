import { ReactElement } from 'react';
import Script from 'next/script';
import CookieService from './CookieService';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Search from 'components/Widgets/Search';
import { ReflektionContent } from 'components/Products/Shop';
import FrequentlyPurchasedTogether from 'components/Widgets/FrequentlyPurchasedTogether';
import PreviewSearchWidgetWrapper from 'components/PreviewSearch/PreviewSearch';

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
  widgets: any;
  types: any;
  ui: {
    html(...args: unknown[]): ReactElement<unknown, string>;
    useRef(...args: unknown[]): any;
    useEffect(...args: unknown[]): any;
    useState(arg1: boolean): any;
    useCallback(...args: unknown[]): any;
  };
}

declare global {
  interface Window {
    RFK: RFK;
    location: Location;
  }
}

// ***** API *****

const DISCOVER_API_KEY = process.env.NEXT_PUBLIC_DISCOVER_API_KEY || '';
interface ProductSortOption {
  value: string;
  label: string;
}

interface DiscoverAccessToken {
  accessToken: string;
  accessTokenExpiry: number;
  refreshToken: string;
  refreshTokenExpiry: number;
}

const DISCOVER_CUSTOMER_KEY = process.env.NEXT_PUBLIC_DISCOVER_CUSTOMER_KEY || '';
// const DISCOVER_CUSTOMER_KEY_SUFFIX = !!DISCOVER_CUSTOMER_KEY
//   ? DISCOVER_CUSTOMER_KEY.substring(DISCOVER_CUSTOMER_KEY.indexOf('-') + 1)
//   : '';
const isDiscoverConfigured = !!DISCOVER_API_KEY && !!DISCOVER_CUSTOMER_KEY;
const discoverTokenCookieName = `ordercloud.discover-token`;
const discoverUuidCookieName = `ordercloud.discover-uuid`;
const discoverSortOptions: ProductSortOption[] = [
  { label: 'Name: A-Z', value: 'name-asc' },
  { label: 'Name: Z-A', value: 'name-desc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Rating: High to Low', value: 'review-desc' },
  { label: 'Rating: Low to High', value: 'review-asc' },
  { label: 'Reviews: High to Low', value: 'review-desc' },
  { label: 'Reviews: Low to High', value: 'review-asc' },
  { label: 'Featured', value: 'featured-desc' },
];

declare global {
  type eventTypes = 'trackEvent' | 'blah';
  interface Window {
    _discover_settings: {
      uid: () => string;
      push: (eventTypes: eventTypes, any: any) => void;
    };
  }
}

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
        window.RFK.setWidgetType(window.RFK.types.PREVIEW_SEARCH, {
          component: PreviewSearchWidgetWrapper,
        });
        window.RFK.setWidget('rfkid_6', {
          type: window.RFK.types.PREVIEW_SEARCH,
          global: true,
          options: {
            preRender: true,
            properties: {
              initial: {
                redirectUrl: '/hs/search?q=',
                inputQuerySelector: '#search-input',
              },
            },
          },
        });
        window.RFK.init();
      }}
    />
  </>
) : undefined;

export const DiscoverSearch: JSX.Element | undefined = <></>;

export class DiscoverService {
  // async init(): Promise<void> {
  //   if (!this.getUuid()) {
  //     const uuid = window._discover_settings.uid();
  //     this.setUuid(uuid);
  //   }
  //   const token = this.getToken();
  //   if (!token) {
  //     const discoverToken = await this.getDiscoverAccessToken();
  //     this.setToken(discoverToken.accessToken);
  //   }
  // }
  // private getUuid(): string {
  //   return CookieService.read(discoverUuidCookieName);
  // }
  // private setUuid(uuid: string): void {
  //   return CookieService.write(discoverUuidCookieName, uuid);
  // }
  // private getToken(): string {
  //   return CookieService.read(discoverTokenCookieName);
  // }
  // private setToken(token: string): void {
  //   return CookieService.write(discoverTokenCookieName, token);
  // }
  // private async getDiscoverAccessToken(): AxiosPromise<DiscoverAccessToken> {
  //   const url = 'https://api.rfksrv.com/account/1/access-token';
  //   const response = axios.post(url, {}).then((response) => {
  //     console.log('response from axios', response);
  //     return response;
  //   });
  // const options: AxiosRequestConfig = {
  //   method: 'POST',
  //   headers: {
  //     'x-api-key': DISCOVER_API_KEY,
  //   },
  //   data: {},
  //   withCredentials: false,
  //   url,
  // };
  // return axios(options);
  // }
}
