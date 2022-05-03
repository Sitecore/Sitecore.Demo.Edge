export type AddToCartPayload = {
  channel: string;
  type: string;
  language: string;
  currency: string;
  page: string;
  pos: string;
  browser_id: string;
  product: {
    type: string;
    item_id: string;
    name: string;
    orderedAt: string;
    quantity: number;
    price: number;
    productId: string;
    currency: string;
    originalPrice?: number;
    originalCurrencyCode?: string;
    referenceId: string;
  };
};
