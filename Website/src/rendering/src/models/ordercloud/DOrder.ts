import { Order } from 'ordercloud-javascript-sdk';

export type DOrder = Order<DOrderXp>;

export interface DOrderXp {
  // add custom xp properties required for this project here
  IsGift?: boolean;
  DeliveryType?: DeliveryTypes;
}

export enum DeliveryTypes {
  PickupFromSummit = 'PickupFromSummit',
  PickupInStore = 'PickupInStore',
  Ship = 'Ship',
}
