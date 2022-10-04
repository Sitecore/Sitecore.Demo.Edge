const BoxeverServiceConfig = {
  channel: 'MOBILE_APP',
  websiteBaseUrl: process.env.NEXT_PUBLIC_WEBSITE_URL,
  proxyUrl: process.env.NEXT_PUBLIC_WEBSITE_CDP_PROXY_URL || '',
};

export default BoxeverServiceConfig;
