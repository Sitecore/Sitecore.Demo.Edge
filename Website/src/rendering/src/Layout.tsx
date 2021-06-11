import Head from 'next/head';
import { useEffect } from 'react';
import { getPublicUrl } from 'lib/util';
import {
  Placeholder,
  LayoutServiceData,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecoreContextValue } from 'lib/component-props';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

type LayoutProps = {
  layoutData: LayoutServiceData;
};

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { updateSitecoreContext } = useSitecoreContext({ updatable: true });

  // Update Sitecore Context if layoutData has changed (i.e. on client-side route change).
  // Note the context object type here matches the initial value in [[...path]].tsx.
  useEffect(() => {
    const context: SitecoreContextValue = {
      route: layoutData.sitecore.route,
      itemId: layoutData.sitecore.route.itemId,
      ...layoutData.sitecore.context,
    };
    updateSitecoreContext && updateSitecoreContext(context);
  }, [layoutData]);

  const { route } = layoutData.sitecore;

  return (
    <>
      <Head>
        <title>
          {(route.fields && route.fields.pageTitle && route.fields.pageTitle.value) || 'Page'}
        </title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
      </Head>

      {/* root placeholders for the app, which we add components to using route data */}
      <header className="header">
        <Placeholder name="jss-header" rendering={route} />
      </header>
      <main>
        <Placeholder name="jss-main" rendering={route} />
      </main>
      <footer>
        <Placeholder name="jss-footer" rendering={route} />
      </footer>
    </>
  );
};

export default Layout;
