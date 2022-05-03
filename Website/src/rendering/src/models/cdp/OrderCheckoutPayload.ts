type OrderExtensions = [
  {
    name?: string;
    key?: string;
    [attribute: string]: string | boolean | number;
  }
];

export type OrderCheckoutPayload = {
  type: string;
  browser_id: string;
  channel: string;
  pos: string;
  language: string;
  currency: string;
  page: string;
  order: {
    referenceId: string;
    orderedAt: string;
    status: string;
    currencyCode: string;
    price: number;
    paymentType: string;
    cardType: string;
    extensions?: OrderExtensions;
    orderItems?: [
      {
        type?: string;
        referenceId?: string;
        orderedAt?: string;
        status?: string;
        currencyCode?: string;
        price?: number;
        name?: string;
        productId?: string;
        quantity?: number;
        extensions?: OrderExtensions;
      }
    ];
  };
};
