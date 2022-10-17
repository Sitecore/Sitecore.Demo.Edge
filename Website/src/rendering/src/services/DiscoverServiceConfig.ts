import { SetupOptions } from '@sitecore-discover/react';

type DiscoverServiceConfigOptions = {
  isStorybook?: boolean;
};

export const DiscoverServiceConfig = (options?: DiscoverServiceConfigOptions): SetupOptions => {
  const DISCOVER_CUSTOMER_KEY = options?.isStorybook
    ? '0-0'
    : process.env.NEXT_PUBLIC_DISCOVER_CUSTOMER_KEY || '';
  const DISCOVER_API_KEY = options?.isStorybook
    ? '0-0-0'
    : process.env.NEXT_PUBLIC_DISCOVER_API_KEY || '';

  const DISCOVER_CONFIG: SetupOptions = {
    env: 'prod',
    customerKey: `${DISCOVER_CUSTOMER_KEY}`,
    apiKey: `${DISCOVER_API_KEY}`,
    useToken: true,
  };

  return DISCOVER_CONFIG;
};

export default DiscoverServiceConfig;
