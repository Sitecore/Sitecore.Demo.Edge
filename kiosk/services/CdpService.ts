import {
  BoxeverScripts,
  logViewEvent as boxeverLogViewEvent,
  identifyVisitor as boxeverIdentifyVisitor,
  forgetCurrentGuest as boxeverForgetCurrentGuest,
} from './BoxeverService';

export const CdpScripts: JSX.Element | undefined = BoxeverScripts;

/**
 * Logs a page view event.
 */
export function logViewEvent(): Promise<unknown> {
  return boxeverLogViewEvent();
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

/**
 * Forgets the current CDP guest and start a new anonymous guest session.
 */
export function forgetCurrentGuest(): Promise<void> {
  return boxeverForgetCurrentGuest();
}
