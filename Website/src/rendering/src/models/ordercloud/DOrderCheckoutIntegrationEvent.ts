import { DOrderWorksheet } from './DOrderWorksheet';

export interface DOrderCheckoutIntegrationEvent<T = null> {
  OrderWorksheet: DOrderWorksheet;
  Environment: 'Production' | 'Staging' | 'Sandbox' | 'Qa';
  OrderCloudAccessToken: string;
  ConfigData: T;
}
