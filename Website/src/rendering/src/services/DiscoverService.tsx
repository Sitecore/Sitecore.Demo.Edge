import Script from 'next/script';

const DISCOVER_CUSTOMER_KEY = process.env.NEXT_PUBLIC_DISCOVER_CUSTOMER_KEY || '';
const DISCOVER_CUSTOMER_KEY_SUFFIX = !!DISCOVER_CUSTOMER_KEY
  ? DISCOVER_CUSTOMER_KEY.substring(DISCOVER_CUSTOMER_KEY.indexOf('-') + 1)
  : '';
const isDiscoverConfigured = !!DISCOVER_CUSTOMER_KEY;

export const DiscoverScripts: JSX.Element | undefined = isDiscoverConfigured ? (
  <Script
    src={`https://${DISCOVER_CUSTOMER_KEY_SUFFIX}-prod.rfksrv.com/rfk/js/${DISCOVER_CUSTOMER_KEY}/init.js`}
    strategy="lazyOnload"
  />
) : undefined;
