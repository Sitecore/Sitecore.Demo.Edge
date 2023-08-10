import {
  BoxeverScripts,
  logViewEvent as boxeverLogViewEvent,
  identifyVisitor as boxeverIdentifyVisitor,
  forgetCurrentGuest as boxeverForgetCurrentGuest,
  logEvent,
  saveDataExtension,
} from './BoxeverService';
import { TICKETS } from '../models/mock-tickets';
import { AddToCartPayload } from '../models/cdp/AddToCartPayload';
import { TicketItem, TicketOrder, TicketPayment } from '../models/ticket';
import { OrderCheckoutPayload, OrderItem } from '../models/cdp/OrderCheckoutPayload';

export const CdpScripts: JSX.Element | undefined = BoxeverScripts;

/**
 * Logs a page view event.
 */
export function logViewEvent(
  additionalData?: Record<string, unknown>,
  page?: string
): Promise<unknown> {
  return boxeverLogViewEvent(additionalData, page);
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
export async function logTicketPurchase(ticketId: number): Promise<unknown> {
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

  await logEvent('TICKET_PURCHASED', eventPayload);
  return saveDataExtension(dataExtensionName, dataExtensionPayload);
}

/**
 * Logs an ADD (add to cart) event
 */
export function logAddToCart(item: TicketItem, quantity: number): Promise<unknown> {
  const addToCartPayload: AddToCartPayload = {
    product: {
      quantity,
      type: item.type.toUpperCase(),
      item_id: item.id,
      name: item.name,
      orderedAt: new Date().toISOString(),
      price: item.price,
      productId: item.id,
      currency: 'USD',
      referenceId: item.id,
    },
  };

  return logEvent('ADD', addToCartPayload);
}

/**
 * Logs an ORDER_CHECKOUT event
 */
export function logOrderCheckout(
  order: TicketOrder,
  item: TicketItem,
  payment: TicketPayment
): Promise<unknown> {
  const orderItems: OrderItem[] = [
    {
      type: item.name,
      referenceId: item.id,
      orderedAt: new Date().toISOString(),
      status: 'PURCHASED',
      currencyCode: 'USD',
      price: item.price,
      name: item.name,
      productId: item.id,
      quantity: 1,
    },
  ];

  const orderCheckoutPayload: OrderCheckoutPayload = {
    order: {
      orderItems,
      referenceId: order.id,
      orderedAt: new Date().toISOString(),
      status: 'PURCHASED',
      currencyCode: 'USD',
      price: order.total,
      paymentType: payment.type,
      cardType: payment.cardType,
    },
  };
  return logEvent('ORDER_CHECKOUT', orderCheckoutPayload);
}
