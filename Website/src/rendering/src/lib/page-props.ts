import { DictionaryPhrases, ComponentPropsCollection } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecoreContextValue } from './component-props';

/**
 * Sitecore page props
 */
export type SitecorePageProps = {
  locale: string;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  sitecoreContext: SitecoreContextValue | null;
};
