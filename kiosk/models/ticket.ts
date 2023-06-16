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
  type: string;
  name: string;
  price: number;
}
