import type { AppProps } from 'next/app';
// DEMO TEAM CUSTOMIZATION - Upgrade to next.js 11. Encapsulate router event handlers in useEffect.
import { useEffect } from 'react';
// END CUSTOMIZATION
import { I18nProvider } from 'next-localization';
import Head from 'next/head';
import NProgress from 'nprogress';

// Using nprogress are completely optional.
//  nprogress provides a loading indicator on page/route changes.
// Remove it in package.json as well if removed here.
import 'nprogress/nprogress.css';
// TODO: Import Material UI here
import 'assets/app.css';

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

  // DEMO TEAM CUSTOMIZATION - Add head section
  return (
    <>
      <Head>
        <meta charSet="UTF-8"></meta>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>

      {/*
        Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
        Note Next.js does not (currently) provide anything for translation, only i18n routing.
        If your app is not multilingual, next-localization and references to it can be removed.
      */}
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        <Component {...rest} />
      </I18nProvider>
    </>
  );
  // END CUSTOMIZATION
}

export default App;
