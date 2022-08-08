import { MeUser, User } from 'ordercloud-javascript-sdk';

export type DMeUser = MeUser<DUserXp>;

export type DUser = User<DUserXp>;

export interface DUserXp {
  // add custom xp properties required for this project here
  DefaultCreditCardID: string;
  DefaultShippingAddressID?: string;
  DefaultBillingAddressID?: string;
}
