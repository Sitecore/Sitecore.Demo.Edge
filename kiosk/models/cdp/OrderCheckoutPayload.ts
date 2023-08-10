type OrderExtension = {
  [key: string]: string | boolean | number;
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
  order: OrderCheckoutCommon & {
    paymentType: string;
    cardType: string;
    extensions?: OrderExtension[];
    orderItems?: OrderItem[];
  };
};
