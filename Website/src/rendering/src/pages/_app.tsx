import type { AppProps } from 'next/app';
// DEMO TEAM CUSTOMIZATION - Upgrade to next.js 11. Encapsulate router event handlers in useEffect.
import { useEffect } from 'react';
// END CUSTOMIZATION
import { I18nProvider } from 'next-localization';
import Head from 'next/head';
import Script from 'next/script';
import NProgress from 'nprogress';

// Using nprogress are completely optional.
//  nprogress provides a loading indicator on page/route changes.
// Remove it in package.json as well if removed here.
import 'nprogress/nprogress.css';
import 'assets/css/main.css';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

function App({ Component, pageProps, router }: AppProps): JSX.Element {
  // DEMO TEAM CUSTOMIZATION - Upgrade to next.js 11. Encapsulate router event handlers in useEffect.
  useEffect(() => {
    const nProgressStart = () => {
      NProgress.start();
    };
    const nProgressDone = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', nProgressStart);
    router.events.on('routeChangeComplete', nProgressDone);
    router.events.on('routeChangeError', nProgressDone);

    // If the component is unmounted, unsubscribe
    // from the events with the `off` method:
    return () => {
      router.events.off('routeChangeStart', nProgressStart);
      router.events.off('routeChangeComplete', nProgressDone);
      router.events.off('routeChangeError', nProgressDone);
    };
  }, [router]);
  // END CUSTOMIZATION

  const { dictionary, ...rest } = pageProps;

  // DEMO TEAM CUSTOMIZATION - Add CDP
  const cdpClientKey = process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '';
  const cdpApiTargetEndpoint = process.env.NEXT_PUBLIC_CDP_API_TARGET_ENDPOINT || '';
  // END CUSTOMIZATION

  // DEMO TEAM CUSTOMIZATION - Add head section
  return (
    <>
      <Head>
        <meta charSet="UTF-8"></meta>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="description" content="Play! Summit" />
      </Head>

      {/*
        Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
        Note Next.js does not (currently) provide anything for translation, only i18n routing.
        If your app is not multilingual, next-localization and references to it can be removed.
      */}
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        <Component {...rest} />
      </I18nProvider>

      {/* DEMO TEAM CUSTOMIZATION - Add CDP */}
      <Script id="cdpSettings">{`
        var cdpClientKey = '${cdpClientKey}';
        var cdpApiTargetEndpoint = '${cdpApiTargetEndpoint}';
        var isCdpClientKeyConfigured = !!cdpClientKey;

        if (isCdpClientKeyConfigured) {
          // Define the Boxever queue
          var _boxeverq = _boxeverq || [];

          _boxever_settings = {
            client_key: cdpClientKey,
            target: cdpApiTargetEndpoint,
            cookie_domain: '.edge.localhost',
          };
        }
      `}</Script>
      <Script src="https://d1mj578wat5n4o.cloudfront.net/boxever-1.4.8.min.js"></Script>
      {/* END CUSTOMIZATION*/}
    </>
  );
  // END CUSTOMIZATION
}

export default App;
