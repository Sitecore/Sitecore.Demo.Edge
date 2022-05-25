import { DLineItem } from '../models/ordercloud/DLineItem';

export const getImageUrl = (lineItem: DLineItem): string => {
  if (!lineItem) {
    return null;
  }
  if (lineItem.Variant?.xp?.Images?.length) {
    return lineItem.Variant.xp.Images[0].Url;
  }
  if (lineItem.Product?.xp?.Images?.length) {
    return lineItem.Product.xp.Images[0].Url;
  }
  return null;
};

export const getItemsCount = (lineItems: DLineItem[]): number => {
  return lineItems.reduce((acc, item) => acc + item.Quantity, 0);
};
