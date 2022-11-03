const BoxeverServiceConfig = {
  // 'MOBILE_WEB' channel only in the event of scanning a QR code or pasting the QR code link in the browser
  channel:
    typeof window !== 'undefined' && window.location.search.includes('qr-code-scan')
      ? 'MOBILE_WEB'
      : 'WEB',
  websiteBaseUrl: typeof window !== 'undefined' ? window.location.origin : '',
  proxyUrl: '/api/cdp',
};

export default BoxeverServiceConfig;
