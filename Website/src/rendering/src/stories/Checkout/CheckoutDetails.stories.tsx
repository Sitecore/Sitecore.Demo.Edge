import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckoutDetails from '../../components/Checkout/CheckoutDetails';
import { MockStore } from '../mock-store';
import { getMockExpirationDate } from '../utils';

export default {
  title: 'Components/Checkout/CheckoutDetails',
  component: CheckoutDetails,
} as ComponentMeta<typeof CheckoutDetails>;

const Template: ComponentStory<typeof CheckoutDetails> = (args) => <CheckoutDetails {...args} />;

export const NoStepsComplete = Template.bind({});
const noStepsCompleteState = {
  initialized: true,
  order: {
    ShippingCost: 0,
    Subtotal: 123.45,
  },
};
NoStepsComplete.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: noStepsCompleteState }}>
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
            Cost: 9.99,
            EstimatedTransitDays: 3,
            xp: {
              Description: 'Receive your order at your home in 3-5 business days',
            },
          },
          {
            ID: 'EXPRESS_DELIVERY',
            Name: 'Express Delivery',
            Cost: 19.99,
            EstimatedTransitDays: 1,
            xp: {
              Description: 'Receive your order at your home in 1-2 business days',
            },
          },
          {
            ID: 'PICKUP_FROM_SUMMIT',
            Name: 'Pick up from the Summit',
            Cost: 0,
            EstimatedTransitDays: 0,
            xp: {
              Description: 'Pick up your order at the summit front desk',
            },
          },
          {
            ID: 'PICKUP_IN_STORE',
            Name: 'Pick up in store',
            Cost: 0,
            EstimatedTransitDays: 0,
            xp: {
              Description: 'Pick up your order in-store',
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
  },
};
ShippingComplete.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: shippingCompleteState }}>
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
            Cost: 9.99,
            EstimatedTransitDays: 3,
            xp: {
              Description: 'Receive your order at your home in 3-5 business days',
            },
          },
          {
            ID: 'EXPRESS_DELIVERY',
            Name: 'Express Delivery',
            Cost: 19.99,
            EstimatedTransitDays: 1,
            xp: {
              Description: 'Receive your order at your home in 1-2 business days',
            },
          },
          {
            ID: 'PICKUP_FROM_SUMMIT',
            Name: 'Pick up from the Summit',
            Cost: 0,
            EstimatedTransitDays: 0,
            xp: {
              Description: 'Pick up your order at the summit front desk',
            },
          },
          {
            ID: 'PICKUP_IN_STORE',
            Name: 'Pick up in store',
            Cost: 0,
            EstimatedTransitDays: 0,
            xp: {
              Description: 'Pick up your order in-store',
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
  },
};
ShippingEstimatesComplete.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: shippingEstimatesCompleteState }}>
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
            Cost: 9.99,
            EstimatedTransitDays: 3,
            xp: {
              Description: 'Receive your order at your home in 3-5 business days',
            },
          },
          {
            ID: 'EXPRESS_DELIVERY',
            Name: 'Express Delivery',
            Cost: 19.99,
            EstimatedTransitDays: 1,
            xp: {
              Description: 'Receive your order at your home in 1-2 business days',
            },
          },
          {
            ID: 'PICKUP_FROM_SUMMIT',
            Name: 'Pick up from the Summit',
            Cost: 0,
            EstimatedTransitDays: 0,
            xp: {
              Description: 'Pick up your order at the summit front desk',
            },
          },
          {
            ID: 'PICKUP_IN_STORE',
            Name: 'Pick up in store',
            Cost: 0,
            EstimatedTransitDays: 0,
            xp: {
              Description: 'Pick up your order in-store',
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
    BillingAddress: {
      ID: 'mockaddressid',
      AddressName: 'Marty Byrde Home',
      Street1: '6818 Gaines Ferry Road',
      City: 'Flowery Branch',
      State: 'GA',
      Zip: '30542',
      Country: 'US',
    },
  },
};
BillingAddressComplete.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: billingAddressCompleteState }}>
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
            Cost: 9.99,
            EstimatedTransitDays: 3,
            xp: {
              Description: 'Receive your order at your home in 3-5 business days',
            },
          },
          {
            ID: 'EXPRESS_DELIVERY',
            Name: 'Express Delivery',
            Cost: 19.99,
            EstimatedTransitDays: 1,
            xp: {
              Description: 'Receive your order at your home in 1-2 business days',
            },
          },
          {
            ID: 'PICKUP_FROM_SUMMIT',
            Name: 'Pick up from the Summit',
            Cost: 0,
            EstimatedTransitDays: 0,
            xp: {
              Description: 'Pick up your order at the summit front desk',
            },
          },
          {
            ID: 'PICKUP_IN_STORE',
            Name: 'Pick up in store',
            Cost: 0,
            EstimatedTransitDays: 0,
            xp: {
              Description: 'Pick up your order in-store',
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
    BillingAddress: {
      ID: 'mockaddressid',
      AddressName: 'Marty Byrde Home',
      Street1: '6818 Gaines Ferry Road',
      City: 'Flowery Branch',
      State: 'GA',
      Zip: '30542',
      Country: 'US',
    },
  },
  payments: [
    {
      ID: 'mockpaymentid',
      Type: 'CreditCard',
      CreditCardID: 'mock-creditcard-id',
      Accepted: true,
      Amount: 100,
      CreditCard: {
        ID: 'mockcreditcardid',
        CardType: 'Visa',
        CardholderName: 'Jon Snow',
        PartialAccountNumber: '6123',
        ExpirationDate: getMockExpirationDate(),
      },
    },
  ],
};
PaymentComplete.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: paymentCompleteState }}>
      <Story />
    </MockStore>
  ),
];

export const CommentsComplete = Template.bind({});
const commentsCompleteState = {
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
            Cost: 9.99,
            EstimatedTransitDays: 3,
            xp: {
              Description: 'Receive your order at your home in 3-5 business days',
            },
          },
          {
            ID: 'EXPRESS_DELIVERY',
            Name: 'Express Delivery',
            Cost: 19.99,
            EstimatedTransitDays: 1,
            xp: {
              Description: 'Receive your order at your home in 1-2 business days',
            },
          },
          {
            ID: 'PICKUP_FROM_SUMMIT',
            Name: 'Pick up from the Summit',
            Cost: 0,
            EstimatedTransitDays: 0,
            xp: {
              Description: 'Pick up your order at the summit front desk',
            },
          },
          {
            ID: 'PICKUP_IN_STORE',
            Name: 'Pick up in store',
            Cost: 0,
            EstimatedTransitDays: 0,
            xp: {
              Description: 'Pick up your order in-store',
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
    BillingAddress: {
      ID: 'mockaddressid',
      AddressName: 'Marty Byrde Home',
      Street1: '6818 Gaines Ferry Road',
      City: 'Flowery Branch',
      State: 'GA',
      Zip: '30542',
      Country: 'US',
    },
    Comments: 'Is there anyway you could just make this free for me? Thanks!',
  },
  payments: [
    {
      ID: 'mockpaymentid',
      Type: 'CreditCard',
      CreditCardID: 'mock-creditcard-id',
      Accepted: true,
      Amount: 100,
      CreditCard: {
        ID: 'mockcreditcardid',
        CardType: 'Visa',
        CardholderName: 'Jon Snow',
        PartialAccountNumber: '6123',
        ExpirationDate: getMockExpirationDate(),
      },
    },
  ],
};
CommentsComplete.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: commentsCompleteState }}>
      <Story />
    </MockStore>
  ),
];
