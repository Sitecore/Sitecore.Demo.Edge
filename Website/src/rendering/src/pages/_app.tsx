import type { AppProps } from 'next/app';
import Router from 'next/router';
import { I18nProvider } from 'next-localization';
import NProgress from 'nprogress';
import { ReactElement, useEffect } from 'react';
import Head from 'next/head';
// DEMO TEAM CUSTOMIZATION - CDP integration
import { CdpScripts, identifyVisitor } from '../services/CdpService';
import { KeypressHandler } from 'src/services/KeypressHandlerService';
// END CUSTOMIZATION
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

// Using nprogress is completely optional.
//  nprogress provides a loading indicator on page/route changes.
// Remove it in package.json as well if removed here.
import 'nprogress/nprogress.css';
import 'assets/css/main.css';

// DEMO TEAM CUSTOMIZATION - Implement per page layouts to conditionally load commerce on some pages https://nextjs.org/docs/basic-features/layouts#per-page-layouts
import { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
// END CUSTOMIZATION

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// DEMO TEAM CUSTOMIZATION (next line) - Different prop type
function App({ Component, pageProps, router }: AppPropsWithLayout): JSX.Element {
  // DEMO TEAM CUSTOMIZATION - Identify the user from an email address from the query string to handle clicks on email links. Also register a key press handler to close CDP sessions and forget CDP guests.
  useEffect(() => {
    const emailQueryStringValue = router.query['email'];
    if (emailQueryStringValue) {
      let email = '';

      if (typeof emailQueryStringValue === 'string') {
        email = emailQueryStringValue as string;
      } else if (typeof emailQueryStringValue === 'object') {
        email = emailQueryStringValue[0];
      }

      identifyVisitor(email);
    }
    KeypressHandler();
  });
  // END CUSTOMIZATION

  const { dictionary, ...rest } = pageProps;

  // DEMO TEAM CUSTOMIZATION - Per page layouts
  const getLayout = Component.getLayout ?? ((page) => page);
  const component = getLayout(<Component {...rest} />);
  // END CUSTOMIZATION

  // DEMO TEAM CUSTOMIZATION - Add head section and CDP integration
  return (
    <>
      <Head>
        <meta charSet="UTF-8"></meta>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="description" content="Play! Summit" />
      </Head>

      {/* DEMO TEAM CUSTOMIZATION - CDP integration. It is important this script is rendered before the <Component> so the CDP calls made on the first page load are successful. */}
      {CdpScripts}
      {/* END CUSTOMIZATION*/}

      {/*
        Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
        Note Next.js does not (currently) provide anything for translation, only i18n routing.
        If your app is not multilingual, next-localization and references to it can be removed.
      */}
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        {/* DEMO TEAM CUSTOMIZATION (next line) - Per page layouts */}
        {component}
      </I18nProvider>
    </>
  );
  // END CUSTOMIZATION
}

export default App;
