import { logViewEvent as boxeverLogViewEvent, BoxeverScripts } from './BoxeverService';
import { RouteData } from '@sitecore-jss/sitecore-jss-nextjs';

export const CdpScripts: JSX.Element | undefined = BoxeverScripts;

type viewEventAdditionalData = {
  sitecoreTemplateName?: string;
  premiumContent?: boolean;
};

// Boxever view page tracking
export function logViewEvent(route: RouteData): Promise<unknown> {
  const additionalData: viewEventAdditionalData = {};

  if (route.templateName) {
    additionalData.sitecoreTemplateName = route.templateName;
  }
  if (route.templateName === 'Session') {
    additionalData.premiumContent = (route.fields?.Premium.value as boolean) || false;
  }

  return boxeverLogViewEvent(additionalData);
}
