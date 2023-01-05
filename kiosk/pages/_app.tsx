import '../styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CdpScripts, logViewEvent } from '../services/CdpService'; // DEMO TEAM CUSTOMIZATION - CDP integration
// DEMO TEAM CUSTOMIZATION - Font Awesome integration
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
// END CUSTOMIZATION

function App({ Component, pageProps, router }: AppProps) {
  const backgroundClassName = router.pathname != '/' ? 'filtered' : '';

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
        <title>PLAY! Summit Kiosk</title>
        <meta name="description" content="PLAY! Summit Kiosk" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={'kiosk-background ' + backgroundClassName}></div>
        <Component {...pageProps} />
      </main>

      {/* DEMO TEAM CUSTOMIZATION - CDP integration */}
      {CdpScripts}
      {/* END CUSTOMIZATION*/}
    </div>
  );
}
export default App;
