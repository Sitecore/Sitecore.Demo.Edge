import React, { useEffect } from 'react';
import Head from 'next/head';
import deepEqual from 'deep-equal';
import {
  Placeholder,
  withSitecoreContext,
  getPublicUrl,
  LayoutServicePageState,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecoreContextValue } from 'lib/component-props'; // DEMO TEAM CUSTOMIZATION - Different type name
import { closeCurrentSession, logQRCodeEvent, logViewEvent } from './services/CdpService'; // DEMO TEAM CUSTOMIZATION - CDP integration
import HeaderCdpMessageBar from './components/HeaderCdpMessageBar';
import { shouldCloseSession } from './services/BoxeverService';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

// DEMO TEAM CUSTOMIZATION - Move navigation to a component

interface LayoutProps {
  sitecoreContext: SitecoreContextValue; // DEMO TEAM CUSTOMIZATION - Different type name
}

// DEMO TEAM CUSTOMIZATION - Add sitecoreContext to destructuring
const Layout = ({ sitecoreContext, sitecoreContext: { route } }: LayoutProps): JSX.Element => {
  // DEMO TEAM CUSTOMIZATION - Log page views in CDP
  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined' && window.location.search.includes('qr-code-scan')) {
        // First close the current CDP session if there is already a 'WEB' one in progress
        // and then log the custom event in the 'MOBILE_WEB' session
        const { shouldCloseCurrentSession } = await shouldCloseSession();
        if (shouldCloseCurrentSession === 'true') {
          await closeCurrentSession();
        }
        await logQRCodeEvent('QR Code TV Scan');
      }
      await logViewEvent(route);
    })();
  }, [route]);
  // END CUSTOMIZATION

  // DEMO TEAM CUSTOMIZATION - Add CSS classes when Experience Editor is active
  const isExperienceEditorActiveCssClass =
    sitecoreContext.pageState === LayoutServicePageState.Edit ||
    sitecoreContext.pageState === LayoutServicePageState.Preview
      ? 'experience-editor-active'
      : '';
  // END CUSTOMIZATION

  // DEMO TEAM CUSTOMIZATION - Use event name from context as the page title
  const contextTitle = sitecoreContext['EventInfo'] as NodeJS.Dict<string | string>;
  let pageTitle = contextTitle.titlePrefix;
  if (route?.fields?.pageTitle?.value) {
    pageTitle += ' - ' + route?.fields?.pageTitle?.value;
  }
  // END CUSTOMIZATION

  return (
    <>
      <Head>
        {/* DEMO TEAM CUSTOMIZATION - Use event name from context as the page title */}
        <title>{pageTitle}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        <meta name="robots" content="noindex" />
      </Head>

      {/* DEMO TEAM CUSTOMIZATION - Remove VisitorIdentification and Navigation */}

      {/* DEMO TEAM CUSTOMIZATION - Add placeholders */}
      {/* root placeholders for the app, which we add components to using route data */}
      <header className={isExperienceEditorActiveCssClass}>
        <Placeholder name="jss-header" rendering={route} />
      </header>
      <main className={isExperienceEditorActiveCssClass}>
        <HeaderCdpMessageBar />
        <Placeholder name="jss-main" rendering={route} />
      </main>
      <footer>
        <Placeholder name="jss-footer" rendering={route} />
      </footer>
      {/* END CUSTOMIZATION*/}
    </>
  );
};

const propsAreEqual = (prevProps: LayoutProps, nextProps: LayoutProps) => {
  if (deepEqual(prevProps.sitecoreContext.route, nextProps.sitecoreContext.route)) return true;

  return false;
};

export default withSitecoreContext()(React.memo(Layout, propsAreEqual));
