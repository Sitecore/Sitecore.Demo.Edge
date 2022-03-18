import { Payment, RequiredDeep, SpendingAccount } from 'ordercloud-javascript-sdk';
import { DBuyerCreditCard } from './DCreditCard';
export type DPayment = Payment<DPaymentXp> & {
  CreditCard?: RequiredDeep<DBuyerCreditCard>;
  SpendingAccount?: RequiredDeep<SpendingAccount>;
};

export interface DPaymentXp {
  // add custom xp properties required for this project here
  FullName?: string;
  CreditCardLastFour?: string;
}
