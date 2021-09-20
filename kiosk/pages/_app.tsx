import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import {
  isCdpConfigured,
  CDP_API_TARGET_ENDPOINT,
  CDP_CLIENT_KEY,
} from '../services/BoxeverService';

// DEMO TEAM CUSTOMIZATION - CDP integration
const cdpScripts = isCdpConfigured ? (
  <>
    <Script id="cdpSettings">{`
      // Define the Boxever queue
      var _boxeverq = _boxeverq || [];
      // Define the Boxever settings
      _boxever_settings = {
        client_key: '${CDP_CLIENT_KEY}',
        target: '${CDP_API_TARGET_ENDPOINT}',
        cookie_domain: '.edge.localhost',
      };`}</Script>
    <Script src="https://d1mj578wat5n4o.cloudfront.net/boxever-1.4.8.min.js"></Script>
  </>
) : undefined;
// END CUSTOMIZATION

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="screen">
      <Head>
        <title>PLAY! Summit TV</title>
        <meta name="description" content="PLAY! Summit Kiosk" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="temp-wrapper temp-wrapper--wider">
          <div className="px px--ls">
            <div className="px__body"></div>

            <div className="px__screen">
              <div className="px__screen__">
                <div className="px__screen__frame">
                  <Component {...pageProps} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* DEMO TEAM CUSTOMIZATION - CDP integration */}
      {cdpScripts}
      {/* END CUSTOMIZATION*/}
    </div>
  );
}
export default App;
