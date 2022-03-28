import { ShipMethod } from 'ordercloud-javascript-sdk';
export type DShipMethod = ShipMethod<DShipMethodXp>;

export interface DShipMethodXp {
  // add custom xp properties required for this project here
  Description: string;
}
