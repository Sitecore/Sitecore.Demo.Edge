import {
  BoxeverScripts,
  logViewEvent as boxeverLogViewEvent,
  identifyVisitor as boxeverIdentifyVisitor,
} from './BoxeverService';
import { RouteData } from '@sitecore-jss/sitecore-jss-nextjs';

export const CdpScripts: JSX.Element | undefined = BoxeverScripts;

type viewEventAdditionalData = {
  sitecoreTemplateName?: string;
  premiumContent?: boolean;
};

/**
 * Logs a page view event.
 */
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

/**
 * Saves the visitor name and email into its CDP profile.
 * Merges the visitor with any existing CDP profile with the same information.
 */
export function identifyVisitor(
  email: string,
  firstName?: string,
  lastName?: string,
  phoneNumber?: string
): Promise<unknown> {
  return boxeverIdentifyVisitor(email, firstName, lastName, phoneNumber);
}
