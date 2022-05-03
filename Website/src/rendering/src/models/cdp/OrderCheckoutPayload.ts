type OrderExtension = {
  name?: string;
  key?: string;
  [attribute: string]: string | boolean | number;
};

type OrderCheckoutCommon = {
  referenceId: string;
  orderedAt: string;
  status: string;
  currencyCode: string;
  price: number;
};

export type OrderItem = Partial<OrderCheckoutCommon> & {
  type?: string;
  name?: string;
  productId?: string;
  quantity?: number;
  extensions?: OrderExtension[];
};

export type OrderCheckoutPayload = {
  type: string;
  browser_id: string;
  channel: string;
  pos: string;
  language: string;
  currency: string;
  page: string;
  order: OrderCheckoutCommon & {
    paymentType: string;
    cardType: string;
    extensions?: OrderExtension[];
    orderItems?: OrderItem[];
  };
};
