export interface Ticket {
  id: string;
  pass: string;
  price: number;
  name: string;
  color: string;
  benefits: string[];
}

export interface TicketItem {
  id: string;
  type: `${TicketTypes}`;
  name: string;
  price: number;
}

export enum TicketTypes {
  Ticket = 'Ticket',
}
