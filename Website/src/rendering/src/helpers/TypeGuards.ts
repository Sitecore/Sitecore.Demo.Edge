import { OrderCloudError } from 'ordercloud-javascript-sdk';

export function isOrderCloudError(error: unknown): error is OrderCloudError {
  return (error as OrderCloudError)?.isOrderCloudError !== undefined;
}
