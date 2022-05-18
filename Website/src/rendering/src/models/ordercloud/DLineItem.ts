import { LineItem } from 'ordercloud-javascript-sdk';
import { DProductXp } from './DProduct';
import { DShipFromAddress } from './DShipFromAddress';
import { DShippingAddressXp } from './DShippingAddress';
import { DVariantXp } from './DVariant';

export type DLineItem = LineItem<
  DLineItemXp,
  DProductXp,
  DVariantXp,
  DShippingAddressXp,
  DShipFromAddress
>;

export interface DLineItemXp {
  // add custom xp properties required for this project here
  IsGift?: boolean;
  Comment?: string;
}
