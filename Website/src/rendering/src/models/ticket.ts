export interface Ticket {
  id: string;
  name: string;
  pass: string;
  price: number;
  fees: number;
  isUpgrade: boolean;
  color?: string;
  benefits?: string[];
  upgradeTargetTicket?: number;
}
