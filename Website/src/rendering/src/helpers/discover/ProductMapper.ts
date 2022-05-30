import { ProductEventModel } from '@sitecore-discover/react';
import { DLineItem } from '../../../src/models/ordercloud/DLineItem';

export default function mapProductsForDiscover(lineItems: DLineItem[]): Array<ProductEventModel> {
  return lineItems.map((lineItem) => ({
    sku: lineItem.ProductID,
    quantity: lineItem.Quantity,
    price: lineItem.UnitPrice,
    priceOriginal: lineItem.UnitPrice,
  }));
}
