import { Order } from 'ordercloud-javascript-sdk';

export type DOrder = Order<DOrderXp>;

export interface DOrderXp {
  // add custom xp properties required for this project here
  IsGift?: boolean;
  // TODO: Export these magic strings as constants and use the constants in the code that use this property.
  DeliveryType?: 'PickupFromSummit' | 'PickupInStore' | 'Ship';
}
