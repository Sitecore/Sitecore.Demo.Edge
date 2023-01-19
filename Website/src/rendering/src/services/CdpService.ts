import {
  BoxeverScripts,
  logViewEvent as boxeverLogViewEvent,
  identifyVisitor as boxeverIdentifyVisitor,
  logEvent,
  saveDataExtension,
  WelcomeMessage,
  getDynamicWelcomeMessage as boxeverGetDynamicWelcomeMessage,
  isCdpConfigured as boxeverIsCdpConfigured,
  closeSession as boxeverCloseSession,
  getGuestEmail as boxeverGetGuestEmail,
  getGuestFirstName as boxeverGetGuestFirstName,
  getGuestLastName as boxeverGetGuestLastName,
  shouldCloseSession as boxeverShouldCloseSession,
  ShouldCloseSessionResponse,
} from './BoxeverService';
import { RouteData } from '@sitecore-jss/sitecore-jss-nextjs';
import { TICKETS } from '../models/mock-tickets';
import { SessionPageFields } from '../types/session';
import { DLineItem } from '../models/ordercloud/DLineItem';
import { AddToCartPayload } from '../models/cdp/AddToCartPayload';
import { OrderCheckoutPayload, OrderItem } from '../models/cdp/OrderCheckoutPayload';
import { DOrder } from '../models/ordercloud/DOrder';
import { DPayment } from '../models/ordercloud/DPayment';

export const isCdpConfigured = boxeverIsCdpConfigured;

export const CdpScripts: JSX.Element | undefined = BoxeverScripts;

export type { WelcomeMessage } from './BoxeverService';

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
 * Logs a custom event when a user scans a QR code on the TV app
 */
export function logQRCodeEvent(
  eventName: string,
  payload?: Record<string, unknown>
): Promise<unknown> {
  return logEvent(eventName, payload);
}

export function closeCurrentSession(): Promise<unknown> {
  return boxeverCloseSession();
}

/**
 * Logs an ADD (add to cart) event
 */
export function logAddToCart(lineItem: DLineItem, quantity: number): Promise<unknown> {
  const addToCartPayload: AddToCartPayload = {
    product: {
      type: lineItem.Product.xp.ProductType.toUpperCase(),
      item_id: lineItem.Variant?.ID || lineItem.ProductID,
      name: lineItem.Product.Name,
      orderedAt: new Date().toISOString(),
      quantity: quantity,
      price: lineItem.UnitPrice,
      productId: lineItem.ProductID,
      currency: 'USD',
      referenceId: lineItem.ID,
    },
  };

  return logEvent('ADD', addToCartPayload);
}

/**
 * Logs an ORDER_CHECKOUT event
 */
export function logOrderCheckout(
  order: DOrder,
  lineItems: DLineItem[],
  payments: DPayment[]
): Promise<unknown> {
  const orderItems: OrderItem[] = [];
  lineItems.forEach((lineItem) => {
    orderItems.push({
      type: lineItem.Product.Name,
      referenceId: lineItem.ID,
      orderedAt: new Date(lineItem.DateAdded).toISOString(),
      status: 'PURCHASED',
      currencyCode: 'USD',
      price: lineItem.UnitPrice,
      name: lineItem.Product.Name,
      productId: lineItem.ProductID,
      quantity: lineItem.Quantity,
    });
  });

  const orderCheckoutPayload: OrderCheckoutPayload = {
    order: {
      orderItems,
      referenceId: order.ID,
      orderedAt: new Date(order.DateSubmitted || order.LastUpdated).toISOString(),
      status: 'PURCHASED',
      currencyCode: 'USD',
      price: order.Total,
      paymentType: 'Card',
      cardType: payments[0].xp?.CreditCard?.CardType,
    },
  };
  return logEvent('ORDER_CHECKOUT', orderCheckoutPayload);
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

export async function getGuestFirstName(): Promise<string> {
  return boxeverGetGuestFirstName();
}

export async function getGuestLastName(): Promise<string> {
  return boxeverGetGuestLastName();
}

export function shouldCloseSession(): Promise<ShouldCloseSessionResponse> {
  return boxeverShouldCloseSession();
}
