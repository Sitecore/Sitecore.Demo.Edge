import '../styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CdpScripts, logViewEvent } from '../services/CdpService'; // DEMO TEAM CUSTOMIZATION - CDP integration

function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    logViewEvent();

    const handleRouteChange = () => {
      logViewEvent();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

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
      {CdpScripts}
      {/* END CUSTOMIZATION*/}
    </div>
  );
}
export default App;
