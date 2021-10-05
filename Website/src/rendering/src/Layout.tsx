import Head from 'next/head';
import { useEffect } from 'react';
import { getPublicUrl } from 'lib/util';
import {
  Placeholder,
  useSitecoreContext,
  LayoutServicePageState,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecoreContextValue } from 'lib/component-props'; // DEMO TEAM CUSTOMIZATION - Different type name
import { logViewEvent } from './services/CdpService'; // DEMO TEAM CUSTOMIZATION - CDP integration

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

// DEMO TEAM CUSTOMIZATION - Move navigation to a component

type LayoutProps = {
  context: SitecoreContextValue; // DEMO TEAM CUSTOMIZATION - Different type name
};

const Layout = ({ context }: LayoutProps): JSX.Element => {
  const { updateSitecoreContext } = useSitecoreContext({ updatable: true });

  // Update Sitecore Context if layoutData has changed (i.e. on client-side route change).
  // Note the context object type here matches the initial value in [[...path]].tsx.
  useEffect(() => {
    updateSitecoreContext && updateSitecoreContext(context);

    // DEMO TEAM CUSTOMIZATION - Log page views in CDP
    const { route } = context;
    logViewEvent(route);
    // END CUSTOMIZATION
  }, [context, updateSitecoreContext]); // DEMO TEAM CUSTOMIZATION - Missing effect parameter to fix linting error

  const { route } = context;

  // DEMO TEAM CUSTOMIZATION - Add CSS classes when Experience Editor is active
  const isExperienceEditorActiveCssClass =
    context.pageState === LayoutServicePageState.Edit ||
    context.pageState === LayoutServicePageState.Preview
      ? 'experience-editor-active'
      : '';

  // DEMO TEAM CUSTOMIZATION - Add Event start date and name to be used globally
  const contextTitle = context['EventInfo'] as NodeJS.Dict<string | string>;
  let pageTitle = contextTitle.titlePrefix;
  if (route?.fields?.pageTitle?.value) {
    pageTitle += ' - ' + route?.fields?.pageTitle?.value;
  }
  // END CUSTOMIZATION

  return (
    <>
      <Head>
        {/*   // DEMO TEAM CUSTOMIZATION - Use Event name as the page title from context */}
        <title>{pageTitle}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
      </Head>

      {/* DEMO TEAM CUSTOMIZATION - Remove VisitorIdentification and Navigation */}

      {/* DEMO TEAM CUSTOMIZATION - Add placeholders */}
      {/* root placeholders for the app, which we add components to using route data */}
      <header className={isExperienceEditorActiveCssClass}>
        <Placeholder name="jss-header" rendering={route} />
      </header>
      <main className={isExperienceEditorActiveCssClass}>
        <Placeholder name="jss-main" rendering={route} />
      </main>
      <footer>
        <Placeholder name="jss-footer" rendering={route} />
      </footer>
      {/* END CUSTOMIZATION*/}
    </>
  );
};

export default Layout;
