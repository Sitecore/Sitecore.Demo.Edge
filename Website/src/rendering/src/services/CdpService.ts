import {
  BoxeverScripts,
  logViewEvent as boxeverLogViewEvent,
  identifyVisitor as boxeverIdentifyVisitor,
  logEvent,
  saveDataExtension,
  WelcomeMessage,
  getDynamicWelcomeMessage as boxeverGetDynamicWelcomeMessage,
  isCdpConfigured as boxeverIsCdpConfigured,
  getGuestEmail as boxeverGetGuestEmail,
} from './BoxeverService';
import { RouteData } from '@sitecore-jss/sitecore-jss-nextjs';
import { TICKETS } from '../models/mock-tickets';
import { SessionPageFields } from '../types/session';

export const isCdpConfigured = boxeverIsCdpConfigured;

export const CdpScripts: JSX.Element | undefined = BoxeverScripts;

type viewEventAdditionalData = {
  sitecoreTemplateName?: string;
  premiumContent?: boolean;
  audiences?: string[];
};

/**
 * Logs a page view event.
 */
export function logViewEvent(route?: RouteData): Promise<unknown> {
  const additionalData: viewEventAdditionalData = {};

  if (route) {
    if (route.templateName) {
      additionalData.sitecoreTemplateName = route.templateName;
    }
    if (route.templateName === 'Session' && route.fields) {
      const sessionFields = route.fields as unknown as SessionPageFields;

      additionalData.premiumContent = sessionFields.Premium?.value || false;
      additionalData.audiences = sessionFields.Audience
        ? sessionFields.Audience.map((audience) => audience.displayName)
        : [];
    }
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

/**
 * Logs the purchase of a ticket as an event, and stores the owned ticket in the visitor CDP profile.
 */
export function logTicketPurchase(ticketId: number): Promise<unknown> {
  const purchasedTicketItem = TICKETS[ticketId];
  // If the purchased ticket is an upgrade, store the target upgrade ticket in the data extension
  const ownedTicket =
    typeof purchasedTicketItem.upgradeTargetTicket !== 'undefined'
      ? TICKETS[purchasedTicketItem.upgradeTargetTicket]
      : purchasedTicketItem;
  const dataExtensionName = 'Ticket';

  const eventPayload = {
    ticketId: ticketId,
    ticketName: purchasedTicketItem.name,
    pricePaid: purchasedTicketItem.price,
  };
  const dataExtensionPayload = {
    key: dataExtensionName,
    ticketId: parseInt(ownedTicket.id),
    ticketName: ownedTicket.name,
  };

  return logEvent('TICKET_PURCHASED', eventPayload).then(() =>
    saveDataExtension(dataExtensionName, dataExtensionPayload)
  );
}

/**
 * Logs an ADD (add to cart) event
 */
export function logAddToCart(payload: Record<string, unknown>): Promise<unknown> {
  return logEvent('ADD', payload);
}

/**
 * Logs an ORDER_CHECKOUT event
 */
export async function logOrderCheckout(payload: Record<string, unknown>): Promise<unknown> {
  return logEvent('ORDER_CHECKOUT', payload);
}

export function getDynamicWelcomeMessage(
  ipAddress: string,
  language: string
): Promise<WelcomeMessage> {
  return boxeverGetDynamicWelcomeMessage(ipAddress, language);
}

export async function getGuestEmail(): Promise<string> {
  return boxeverGetGuestEmail();
}
