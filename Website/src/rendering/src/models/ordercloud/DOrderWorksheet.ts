import { OrderWorksheet } from 'ordercloud-javascript-sdk';
import { DBillingAddressXp } from './DBillingAddress';
import { DLineItemXp } from './DLineItem';
import { DOrderXp } from './DOrder';
import { DOrderApprovedResponseXp } from './DOrderApprovedResponse';
import { DOrderCalculateResponseXp } from './DOrderCalculateResponse';
import { DOrderSubmitForApprovalResponseXp } from './DOrderSubmitForApprovalResponse';
import { DOrderSubmitResponseXp } from './DOrderSubmitResponse';
import { DProductXp } from './DProduct';
import { DShipEstimateResponseXp, DShipEstimateXp } from './DShipEstimateResponse';
import { DShipFromAddressXp } from './DShipFromAddress';
import { DShippingAddressXp } from './DShippingAddress';
import { DUserXp } from './DUser';
import { DVariantXp } from './DVariant';

export type DOrderWorksheet = OrderWorksheet<
  DUserXp,
  DBillingAddressXp,
  DOrderXp,
  DProductXp,
  DVariantXp,
  DShippingAddressXp,
  DShipFromAddressXp,
  DLineItemXp,
  DShipEstimateXp,
  DShipEstimateResponseXp,
  DOrderCalculateResponseXp,
  DOrderSubmitResponseXp,
  DOrderSubmitForApprovalResponseXp,
  DOrderApprovedResponseXp
>;
