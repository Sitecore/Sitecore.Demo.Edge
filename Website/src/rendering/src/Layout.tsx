import React, { useEffect } from 'react'; // DEMO TEAM CUSTOMIZATION - CDP integration
import Head from 'next/head';
// DEMO TEAM CUSTOMIZATION - Remove VisitorIdentification, Add LayoutServicePageState
import {
  Placeholder,
  getPublicUrl,
  LayoutServiceData,
  LayoutServicePageState,
} from '@sitecore-jss/sitecore-jss-nextjs';
// DEMO TEAM CUSTOMIZATION - Not loading navigation in the layout
// DEMO TEAM CUSTOMIZATION - CDP integration
import { logViewEvent } from './services/CdpService';
import HeaderCdpMessageBar from './components/HeaderCdpMessageBar';
// END CUSTOMIZATION

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;

  // DEMO TEAM CUSTOMIZATION - Log page views in CDP
  useEffect(() => {
    logViewEvent(route);
  }, [route]);
  // END CUSTOMIZATION

  // DEMO TEAM CUSTOMIZATION - Add CSS classes when Experience Editor is active
  const { context } = layoutData.sitecore;
  const isExperienceEditorActiveCssClass =
    context.pageState === LayoutServicePageState.Edit ||
    context.pageState === LayoutServicePageState.Preview
      ? 'experience-editor-active'
      : '';
  // END CUSTOMIZATION

  // DEMO TEAM CUSTOMIZATION - Use event name from context as the page title
  const contextTitle = context['EventInfo'] as NodeJS.Dict<string | string>;
  let pageTitle = contextTitle.titlePrefix;
  if (route?.fields?.pageTitle?.value) {
    pageTitle += ` - ${route.fields.pageTitle.value}`;
  }
  // END CUSTOMIZATION

  // DEMO TEAM CUSTOMIZATION - Add placeholders
  const content = route && (
    <>
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
    </>
  );

  return (
    <>
      <Head>
        {/* DEMO TEAM CUSTOMIZATION - Use event name from context as the page title */}
        <title>{pageTitle}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
      </Head>

      {/* DEMO TEAM CUSTOMIZATION - Remove VisitorIdentification and Navigation */}

      {/* root placeholders for the app, which we add components to using route data */}
      {/* DEMO TEAM CUSTOMIZATION - Add placeholders */}
      {content}
    </>
  );
};

export default Layout;
