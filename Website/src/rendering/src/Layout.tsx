import React, { useEffect } from 'react'; // DEMO TEAM CUSTOMIZATION - Log page views in CDP
import Head from 'next/head';
// DEMO TEAM CUSTOMIZATION - Remove VisitorIdentification, Add LayoutServicePageState
import {
  Placeholder,
  getPublicUrl,
  LayoutServiceData,
  LayoutServicePageState,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { closeCurrentSession, logQRCodeEvent, logViewEvent } from './services/CdpService'; // DEMO TEAM CUSTOMIZATION - CDP integration
import HeaderCdpMessageBar from './components/HeaderCdpMessageBar';
import { shouldCloseSession } from './services/BoxeverService';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route, context } = layoutData.sitecore; // DEMO TEAM CUSTOMIZATION - Add context to destructuring

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

  // DEMO TEAM CUSTOMIZATION - Add CSS classes when Sitecore editors are active
  const isExperienceEditorActiveCssClass =
    context.pageState === LayoutServicePageState.Edit ||
    context.pageState === LayoutServicePageState.Preview
      ? 'experience-editor-active'
      : '';
  // END CUSTOMIZATION

  // DEMO TEAM CUSTOMIZATION - Use event name from context as the page title
  const fields = route?.fields;
  const contextTitle = context['EventInfo'] as NodeJS.Dict<string | string>;
  let pageTitle = contextTitle.titlePrefix;
  if (fields?.pageTitle?.value.toString()) {
    pageTitle += ` - ${fields.pageTitle.value.toString()}`;
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

      {/* root placeholders for the app, which we add components to using route data */}
      {/* DEMO TEAM CUSTOMIZATION - Add placeholders. Add CSS classes when Sitecore editors are active. Add HeaderCdpMessageBar. */}
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
      {/* END CUSTOMIZATION */}
    </>
  );
};

export default Layout;
