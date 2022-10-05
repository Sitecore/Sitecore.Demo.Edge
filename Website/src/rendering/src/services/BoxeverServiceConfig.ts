const BoxeverServiceConfig = {
  channel: 'WEB',
  websiteBaseUrl: typeof window !== 'undefined' ? window.location.origin : '',
  proxyUrl: '/api/cdp',
};

export default BoxeverServiceConfig;
