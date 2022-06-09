export type AddToCartPayload = {
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
