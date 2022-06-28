import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckoutDetails from '../../components/Checkout/CheckoutDetails';
import { MockStore } from '../mock-store';
import { getMockExpirationDate } from '../utils';
import { loggedInAuthSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/CheckoutDetails',
  component: CheckoutDetails,
} as ComponentMeta<typeof CheckoutDetails>;

const Template: ComponentStory<typeof CheckoutDetails> = (args) => <CheckoutDetails {...args} />;

export const NoLineItems = Template.bind({});
const noLineItemsState = {
  initialized: true,
  order: {
    LineItemCount: 0,
  },
};
NoLineItems.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[{ name: 'ocCurrentCart', state: noLineItemsState }, loggedInAuthSlice]}
    >
      <Story />
    </MockStore>
  ),
];

export const Loading = Template.bind({});
const loadingState = {
  initialized: false,
};
Loading.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={[{ name: 'ocCurrentCart', state: loadingState }, loggedInAuthSlice]}>
      <Story />
    </MockStore>
  ),
];

export const NoStepsComplete = Template.bind({});
const noStepsCompleteState = {
  initialized: true,
  order: {
    ShippingCost: 0,
    Subtotal: 123.45,
    LineItemCount: 1,
    xp: {
      DeliveryType: 'Ship',
    },
  },
};
NoStepsComplete.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[{ name: 'ocCurrentCart', state: noStepsCompleteState }, loggedInAuthSlice]}
    >
      <Story />
    </MockStore>
  ),
];

export const ShippingComplete = Template.bind({});
const shippingCompleteState = {
  initialized: true,
  shippingAddress: {
    ID: 'mockaddressid',
    AddressName: 'Marty Byrde Home',
    Street1: '6818 Gaines Ferry Road',
    City: 'Flowery Branch',
    State: 'GA',
    Zip: '30542',
    Country: 'US',
  },
  shipEstimateResponse: {
    ShipEstimates: [
      {
        ID: 'STATIC_SINGLE_SHIPMENT',
        ShipEstimateItems: [
          {
            LineItemID: 'X001',
            Quantity: 2,
          },
        ],
        ShipMethods: [
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
            EstimatedTransitDays: 2,
            xp: {
              Description: 'Receive your order at your home the next business day',
            },
          },
        ],
      },
    ],
  },
  order: {
    ID: 'mockid123',
    Subtotal: 123.45,
    ShippingCost: 0,
    LineItemCount: 1,
    xp: {
      DeliveryType: 'Ship',
    },
  },
};
ShippingComplete.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[{ name: 'ocCurrentCart', state: shippingCompleteState }, loggedInAuthSlice]}
    >
      <Story />
    </MockStore>
  ),
];

export const ShippingEstimatesComplete = Template.bind({});
const shippingEstimatesCompleteState = {
  initialized: true,
  shippingAddress: {
    ID: 'mockaddressid',
    AddressName: 'Marty Byrde Home',
    Street1: '6818 Gaines Ferry Road',
    City: 'Flowery Branch',
    State: 'GA',
    Zip: '30542',
    Country: 'US',
  },
  shipEstimateResponse: {
    ShipEstimates: [
      {
        ID: 'STATIC_SINGLE_SHIPMENT',
        SelectedShipMethodID: 'EXPRESS_DELIVERY',
        ShipEstimateItems: [
          {
            LineItemID: 'X001',
            Quantity: 2,
          },
        ],
        ShipMethods: [
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
            EstimatedTransitDays: 2,
            xp: {
              Description: 'Receive your order at your home the next business day',
            },
          },
        ],
      },
    ],
  },
  order: {
    ID: 'mockid123',
    Subtotal: 123.45,
    ShippingCost: 19.99,
    LineItemCount: 1,
    xp: {
      DeliveryType: 'Ship',
    },
  },
};
ShippingEstimatesComplete.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: shippingEstimatesCompleteState },
        loggedInAuthSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const BillingAddressComplete = Template.bind({});
const billingAddressCompleteState = {
  initialized: true,
  shippingAddress: {
    ID: 'mockaddressid',
    AddressName: 'Marty Byrde Home',
    Street1: '6818 Gaines Ferry Road',
    City: 'Flowery Branch',
    State: 'GA',
    Zip: '30542',
    Country: 'US',
  },
  shipEstimateResponse: {
    ShipEstimates: [
      {
        ID: 'STATIC_SINGLE_SHIPMENT',
        SelectedShipMethodID: 'EXPRESS_DELIVERY',
        ShipEstimateItems: [
          {
            LineItemID: 'X001',
            Quantity: 2,
          },
        ],
        ShipMethods: [
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
            EstimatedTransitDays: 2,
            xp: {
              Description: 'Receive your order at your home the next business day',
            },
          },
        ],
      },
    ],
  },
  order: {
    ID: 'mockid123',
    Subtotal: 123.45,
    ShippingCost: 19.99,
    LineItemCount: 1,
    BillingAddress: {
      ID: 'mockaddressid',
      AddressName: 'Marty Byrde Home',
      Street1: '6818 Gaines Ferry Road',
      City: 'Flowery Branch',
      State: 'GA',
      Zip: '30542',
      Country: 'US',
    },
    xp: {
      DeliveryType: 'Ship',
    },
  },
};
BillingAddressComplete.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: billingAddressCompleteState },
        loggedInAuthSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const PaymentComplete = Template.bind({});
const paymentCompleteState = {
  initialized: true,
  shippingAddress: {
    ID: 'mockaddressid',
    AddressName: 'Marty Byrde Home',
    Street1: '6818 Gaines Ferry Road',
    City: 'Flowery Branch',
    State: 'GA',
    Zip: '30542',
    Country: 'US',
  },
  shipEstimateResponse: {
    ShipEstimates: [
      {
        ID: 'STATIC_SINGLE_SHIPMENT',
        SelectedShipMethodID: 'EXPRESS_DELIVERY',
        ShipEstimateItems: [
          {
            LineItemID: 'X001',
            Quantity: 2,
          },
        ],
        ShipMethods: [
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
            EstimatedTransitDays: 2,
            xp: {
              Description: 'Receive your order at your home the next business day',
            },
          },
        ],
      },
    ],
  },
  order: {
    ID: 'mockid123',
    Subtotal: 123.45,
    ShippingCost: 19.99,
    LineItemCount: 1,
    BillingAddress: {
      ID: 'mockaddressid',
      AddressName: 'Marty Byrde Home',
      Street1: '6818 Gaines Ferry Road',
      City: 'Flowery Branch',
      State: 'GA',
      Zip: '30542',
      Country: 'US',
    },
    xp: {
      DeliveryType: 'Ship',
    },
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
PaymentComplete.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[{ name: 'ocCurrentCart', state: paymentCompleteState }, loggedInAuthSlice]}
    >
      <Story />
    </MockStore>
  ),
];

export const PickupFromSummit = Template.bind({});
const pickupFromSummitState = {
  initialized: true,
  shippingAddress: {
    AddressName: 'Play! Summit',
    Street1: '101 California St',
    Street2: 'St #1600',
    City: 'San Francisco',
    State: 'CA',
    Country: 'US',
    Zip: '94111',
  },
  order: {
    ID: 'mockid123',
    Subtotal: 123.45,
    ShippingCost: 19.99,
    LineItemCount: 1,
    BillingAddress: {
      ID: 'mockaddressid',
      AddressName: 'Marty Byrde Home',
      Street1: '6818 Gaines Ferry Road',
      City: 'Flowery Branch',
      State: 'GA',
      Zip: '30542',
      Country: 'US',
    },
    xp: {
      DeliveryType: 'PickupFromSummit',
    },
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
PickupFromSummit.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[{ name: 'ocCurrentCart', state: pickupFromSummitState }, loggedInAuthSlice]}
    >
      <Story />
    </MockStore>
  ),
];

export const PickupFromStore = Template.bind({});
const pickupFromStoreState = {
  initialized: true,
  shippingAddress: {
    AddressName: 'Store #1234',
    Street1: '110 N. 5th St #300',
    City: 'Minneapolis',
    State: 'MN',
    Country: 'US',
    Zip: '55403',
  },
  order: {
    ID: 'mockid123',
    Subtotal: 123.45,
    ShippingCost: 19.99,
    LineItemCount: 1,
    BillingAddress: {
      ID: 'mockaddressid',
      AddressName: 'Marty Byrde Home',
      Street1: '6818 Gaines Ferry Road',
      City: 'Flowery Branch',
      State: 'GA',
      Zip: '30542',
      Country: 'US',
    },
    xp: {
      DeliveryType: 'PickupInStore',
    },
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
PickupFromStore.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[{ name: 'ocCurrentCart', state: pickupFromStoreState }, loggedInAuthSlice]}
    >
      <Story />
    </MockStore>
  ),
];

export const GuestCheckout = Template.bind({});
const guestCheckoutCartState = {
  initialized: true,
  order: {
    ShippingCost: 0,
    Subtotal: 123.45,
    LineItemCount: 1,
    xp: {
      DeliveryType: 'Ship',
    },
  },
};
const guestCheckoutAuthState = {
  isAnonymous: true,
};
GuestCheckout.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: guestCheckoutCartState },
        { name: 'ocAuth', state: guestCheckoutAuthState },
      ]}
    >
      <Story />
    </MockStore>
  ),
];
