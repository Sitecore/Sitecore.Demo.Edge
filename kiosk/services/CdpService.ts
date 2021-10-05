import {
  BoxeverScripts,
  logViewEvent as boxeverLogViewEvent,
  identifyVisitor as boxeverIdentifyVisitor,
  forgetCurrentGuest as boxeverForgetCurrentGuest,
  logEvent,
  saveDataExtension,
} from './BoxeverService';
import { TICKETS } from '../models/mock-tickets';

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

/**
 * Logs the purchase of a ticket as an event, and stores the owned ticket in the visitor CDP profile.
 */
export function logTicketPurchase(ticketId: number): Promise<unknown> {
  const ticket = TICKETS[ticketId];
  const dataExtensionName = 'Ticket';

  const eventPayload = {
    ticketId: ticketId,
    ticketName: ticket.name,
    pricePaid: ticket.price,
  };
  const dataExtensionPayload = {
    key: dataExtensionName,
    ticketId: ticketId,
    ticketName: ticket.name,
  };

  return logEvent('TICKET_PURCHASED', eventPayload).then(() =>
    saveDataExtension(dataExtensionName, dataExtensionPayload)
  );
}
