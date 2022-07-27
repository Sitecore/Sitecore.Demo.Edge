import { Spec } from 'ordercloud-javascript-sdk';
import { DeliveryTypes } from '../../models/ordercloud/DOrder';
import { DOrderPromotion } from '../../models/ordercloud/DOrderPromotion';
import { MockSlice } from '../mock-store';
import { getMockExpirationDate } from '../utils';

export const cartState = {
  lineItems: [
    {
      ID: 'lineitem1',
      Quantity: 1,
      ProductID: 'PSPCCCCBC',
      LineSubtotal: 4,
      Product: {
        Name: 'Carbon Cycling Bottle Cage',
        xp: {
          Images: [
            {
              Url: 'https://ch.sitecoredemo.com/api/public/content/carbon-cycling-bottle-cage-product?v=312458fb',
            },
          ],
          ProductUrl: '/shop/products/PSPCCCCBC/centercycle-carbon-cycling-bottle-cage',
          Brand: 'CenterCycle',
        },
      },
      Specs: [] as Spec[],
      UnitPrice: 34.99,
    },
    {
      ID: 'lineitem2',
      Quantity: 2,
      ProductID: 'PSPPSSGB',
      LineSubtotal: 10,
      Product: {
        Name: 'Sunday Golf Bag',
        xp: {
          Images: [
            {
              Url: 'https://ch.sitecoredemo.com/api/public/content/sunday-golf-bag-product?v=23b29a0c',
            },
          ],
          ProductUrl: 'shop/products/PSPPSSGB/pro-staff-sunday-golf-bag',
          Brand: 'Pro Staff',
        },
      },
      Specs: [] as Spec[],
      UnitPrice: 1000,
    },
    {
      ID: 'lineitem3',
      Quantity: 3,
      ProductID: 'PSPRFSAW',
      LineSubtotal: 5,
      Product: {
        Name: 'Robin Fitness Strengthening Ab Wheel',
        xp: {
          Images: [
            {
              Url: 'https://ch.sitecoredemo.com/api/public/content/abb-wheel-1-product?v=9dbb093f',
            },
          ],
          ProductUrl: 'shop/products/PSPRFSAW/robin-fitness-strengthening-ab-wheel',
          Brand: 'Robin Fitness',
        },
      },
      Variant: {
        xp: {
          Images: [
            {
              Url: 'https://ch.sitecoredemo.com/api/public/content/abb-wheel-1-product?v=9dbb093f',
            },
          ],
          ProductUrl: '#',
          Brand: 'Robin Fitness',
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
      UnitPrice: 15,
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
          ProductUrl: '#',
          Brand: 'Mania Print',
        },
      },
      Specs: [] as Spec[],
      UnitPrice: 19.99,
    },
  ],
  promotions: [] as unknown,
  initialized: true,
  order: {
    ID: 'mockorderid',
    BillingAddress: {
      ID: 'mockaddressid',
      AddressName: 'Marty Byrde Home',
      Street1: '6818 Gaines Ferry Road',
      City: 'Flowery Branch',
      State: 'GA',
      Zip: '30542',
      Country: 'US',
    },
    Subtotal: 1069.98,
    ShippingCost: 4.99,
    TaxCost: 256.79,
    Total: 1331.76,
    LineItemCount: 4,
    xp: {
      DeliveryType: DeliveryTypes.Ship,
    },
  },
  shippingAddress: {
    ID: 'mockaddressid',
    AddressName: 'Marty Byrde Home',
    Street1: '6818 Gaines Ferry Road',
    City: 'Flowery Branch',
    State: 'GA',
    Zip: '30542',
    Country: 'US',
  },
  payments: [
    {
      ID: 'mockpaymentid',
      Type: 'CreditCard',
      CreditCardID: 'mock-creditcard-id',
      Accepted: true,
      Amount: 100,
      xp: {
        CreditCard: {
          ID: 'mockcreditcardid',
          CardType: 'Visa',
          CardholderName: 'Jon Snow',
          PartialAccountNumber: '6123',
          ExpirationDate: getMockExpirationDate(),
        },
      },
    },
  ],
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

export const addressBookState = {
  addressBookLoading: false,
  addresses: {
    ids: ['MPcTM2MNzEWi06gLhfMLvQ', 'dxMIwY-WXkCUUYUfZRt3CA'],
    entities: {
      MPcTM2MNzEWi06gLhfMLvQ: {
        ID: 'MPcTM2MNzEWi06gLhfMLvQ',
        Shipping: true,
        Billing: true,
        Editable: true,
        DateCreated: '2022-06-01T20:31:44.403+00:00',
        CompanyName: '',
        FirstName: 'Marty',
        LastName: 'Byrde',
        Street1: '6818 Gaines Ferry Road',
        Street2: '',
        City: 'Flowery Branch',
        State: 'GA',
        Zip: '30542',
        Country: 'US',
        Phone: '',
        AddressName: 'Home',
      },
      'dxMIwY-WXkCUUYUfZRt3CA': {
        ID: 'dxMIwY-WXkCUUYUfZRt3CA',
        Shipping: true,
        Billing: true,
        Editable: true,
        DateCreated: '2022-06-02T12:39:46.3+00:00',
        CompanyName: '',
        FirstName: 'Marty',
        LastName: 'Byrde',
        Street1: '123 other street',
        Street2: '',
        City: 'Other City',
        State: 'QC',
        Zip: 'A1A1A1',
        Country: 'CA',
        Phone: '',
        AddressName: 'Secondary Home',
      },
    },
  },
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

export const emptyAddressBookSlice: MockSlice = {
  name: 'ocAddressBook',
  state: {
    addressBookLoading: false,
    addresses: { ids: [], entities: {} },
  },
};

export const addressBookSlice: MockSlice = {
  name: 'ocAddressBook',
  state: addressBookState,
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

export const shipEstimateResponse = {
  ShipEstimates: [
    {
      ID: 'STATIC_SINGLE_SHIPMENT',
      SelectedShipMethodID: 'EXPRESS_DELIVERY',
      ShipMethods: shipMethods,
    },
  ],
};
