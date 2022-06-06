import { Spec } from 'ordercloud-javascript-sdk';
import { DOrderPromotion } from 'src/models/ordercloud/DOrderPromotion';
import { MockSlice } from '../mock-store';

export const cartState = {
  lineItems: [
    {
      ID: 'lineitem1',
      Quantity: 1,
      ProductID: 'PSPCCCCBC',
      LineSubtotal: 4,
      Product: {
        Name: 'CenterCycle Carbon Cycling Bottle Cage',
        xp: {
          Images: [
            {
              // TODO: replace with our own hosted images once fixed
              Url: 'https://m.media-amazon.com/images/I/61LPos5CIaL._AC_SL1500_.jpg',
            },
          ],
        },
      },
      Specs: [] as Spec[],
    },
    {
      ID: 'lineitem2',
      Quantity: 2,
      ProductID: 'PSPPSSGB',
      LineSubtotal: 10,
      Product: {
        Name: 'Pro Staff Sunday Golf Bag',
        xp: {
          Images: [
            {
              // TODO: replace with our own hosted images once fixed
              Url: 'https://cdn.shopify.com/s/files/1/0150/9084/products/2020_sl1_white_image1_76540d19-28dd-4284-a57f-518cd2472e7f_x1800.jpg?v=1640023075',
            },
          ],
        },
      },
      Specs: [] as Spec[],
    },
    {
      ID: 'lineitem3',
      Quantity: 3,
      ProductID: 'PSPRFSAW',
      LineSubtotal: 5,
      Product: {
        Name: 'Robit Fitness Strengthening Ab Wheel',
        xp: {
          Images: [
            {
              // TODO: replace with our own hosted images once fixed
              Url: 'https://assets.roguefitness.com/f_auto,q_auto,c_limit,w_1960,b_rgb:f8f8f8/catalog/Conditioning/Speed%20and%20Agility/Core%20and%20Stability/AD0053/AD0053-H_p1yblu.png',
            },
          ],
        },
      },
      Variant: {
        xp: {
          Images: [
            {
              // TODO: replace with our own hosted images once fixed
              Url: 'https://headstartdemo.blob.core.windows.net/assets/GreenLarge.png',
            },
          ],
        },
      },
      Specs: [
        {
          Name: 'Color',
          Value: 'Green',
        },
        {
          Name: 'Size',
          Value: 'Large',
        },
      ],
    },
    {
      ID: 'lineitem4',
      Quantity: 100,
      ProductID: 'BUSINESS_CARDS',
      LineSubtotal: 5,
      Product: {
        Name: 'Standard Business Cards that also have a super duper really long name',
        xp: {
          Images: [
            {
              // TODO: replace with our own hosted images once fixed
              Url: 'https://static.gotprint.com/tl/en_US/products/business-cards/info/img/desktop/standard.jpg',
            },
          ],
        },
      },
      Specs: [],
    },
  ],
  promotions: [] as unknown,
  initialized: true,
  order: {
    LineItemCount: 4,
    Subtotal: 24,
  },
};

export const productCacheState = {
  ids: ['PSPCCCCBC', 'PSPPSSGB', 'PSPRFSAW', 'BUSINESS_CARDS'],
  entities: {
    PSPCCCCBC: {
      ID: 'PSPCCCCBC',
      PriceSchedule: {
        MinQuantity: 1,
        MaxQuantity: 10,
        RestrictedQuantity: false,
        PriceBreaks: [{ Quantity: 1, Price: 20 }],
      },
    },
    PSPPSSGB: {
      ID: 'PSPPSSGB',
      PriceSchedule: {
        MinQuantity: 1,
        MaxQuantity: 10,
        RestrictedQuantity: false,
        PriceBreaks: [{ Quantity: 1, Price: 20 }],
      },
    },
    PSPRFSAW: {
      ID: 'PSPRFSAW',
      PriceSchedule: {
        MinQuantity: 1,
        MaxQuantity: 10,
        RestrictedQuantity: false,
        PriceBreaks: [{ Quantity: 1, Price: 20 }],
      },
    },
    BUSINESS_CARDS: {
      ID: 'BUSINESS_CARDS',
      PriceSchedule: {
        MinQuantity: 1,
        MaxQuantity: 10,
        RestrictedQuantity: true,
        PriceBreaks: [
          { Quantity: 100, Price: 5.99 },
          { Quantity: 250, Price: 9.99 },
          { Quantity: 500, Price: 14.99 },
          { Quantity: 1000, Price: 19.99 },
        ],
      },
    },
  },
};

export const loggedInAuthState = {
  isAuthenticated: true,
  isAnonymous: false,
};

export const anonymousAuthState = {
  isAuthenticated: false,
  isAnonymous: true,
};

export const orderState = {
  initialized: true,
};

export const cartSlice: MockSlice = {
  name: 'ocCurrentCart',
  state: cartState,
};

export const notInitializedCartSlice: MockSlice = {
  name: 'ocCurrentCart',
  state: {
    ...cartState,
    initialized: false,
    orderTotalLoading: true,
  },
};

export const productCacheSlice: MockSlice = {
  name: 'ocProductCache',
  state: productCacheState,
};

export const loggedInAuthSlice: MockSlice = {
  name: 'ocAuth',
  state: loggedInAuthState,
};

export const anonymousAuthSlice: MockSlice = {
  name: 'ocAuth',
  state: anonymousAuthState,
};

export const orderSlice: MockSlice = {
  name: 'ocCurrentOrder',
  state: orderState,
};

export const promotionCartSlice: MockSlice = {
  name: 'ocCurrentCart',
  state: {
    ...cartState,
    promotions: [
      // ID, Code, Description, Amount
      {
        ID: 'promo10off',
        Code: '10off',
        Description: '10% off your order',
        Amount: 5.47,
      },
      {
        ID: 'promofirsttimeuser',
        Code: '20firsttimeuser',
        Description: '$20 off your first order',
        Amount: 20,
      },
    ] as DOrderPromotion[],
  },
};

export const shipMethods = [
  {
    ID: 'STANDARD_DELIVERY',
    Name: 'Standard Delivery',
    Cost: 0,
    EstimatedTransitDays: 3,
    xp: {
      Description: 'Receive your order at your home in 3-5 business days',
    },
  },
  {
    ID: 'EXPRESS_DELIVERY',
    Name: 'Express Delivery',
    Cost: 4.99,
    EstimatedTransitDays: 2,
    xp: {
      Description: 'Receive your order at your home in 1-2 business days',
    },
  },
  {
    ID: 'ONEDAY_DELIVERY',
    Name: 'One day delivery',
    Cost: 9.99,
    EstimatedTransitDays: 1,
    xp: {
      Description: 'Receive your order at your home the next business day',
    },
  },
];
