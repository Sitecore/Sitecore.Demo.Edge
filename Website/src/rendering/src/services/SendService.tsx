import Script from 'next/script';

const WEBSITE_ID = process.env.NEXT_PUBLIC_SEND_WEBSITE_ID || '';
export const isSendConfigured = !!WEBSITE_ID;

export const SendScripts: JSX.Element | undefined = isSendConfigured ? (
  <Script src=""></Script>
) : undefined;
