import { Payment, SpendingAccount } from 'ordercloud-javascript-sdk';
import { DBuyerCreditCard } from './DCreditCard';
export type DPayment = Payment<DPaymentXp>;

export interface DPaymentXp {
  // add custom xp properties required for this project here
  CreditCard?: DBuyerCreditCard;
  SpendingAccount?: SpendingAccount;
}
