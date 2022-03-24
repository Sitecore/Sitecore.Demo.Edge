import { DiscoverScripts } from './DiscoverService';
import { isCommerceEnabled } from '../helpers/CommerceHelper';

export const MerchandisingScripts: JSX.Element | undefined = isCommerceEnabled
  ? DiscoverScripts
  : undefined;
