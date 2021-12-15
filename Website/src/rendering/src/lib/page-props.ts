import { DictionaryPhrases, ComponentPropsCollection } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecoreContextValue } from './component-props'; // DEMO TEAM CUSTOMIZATION - Different type name

/**
 * Sitecore page props
 */
export type SitecorePageProps = {
  locale: string;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  sitecoreContext: SitecoreContextValue | null; // DEMO TEAM CUSTOMIZATION - Different type name
};
