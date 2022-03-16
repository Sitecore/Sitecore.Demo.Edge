import { ShipEstimateResponse } from 'ordercloud-javascript-sdk';
import { DShipMethodXp } from './DShipMethod';

export type DShipEstimateResponse = ShipEstimateResponse<
  DShipEstimateResponseXp,
  DShipEstimateXp,
  DShipMethodXp
>;

export interface DShipEstimateResponseXp {
  // add custom xp properties required for this project here
}

export interface DShipEstimateXp {
  // add custom xp properties required for this project here
}
