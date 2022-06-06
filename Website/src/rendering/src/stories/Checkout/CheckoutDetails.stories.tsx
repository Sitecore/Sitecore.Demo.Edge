import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckoutDetails from '../../components/Checkout/CheckoutDetails';
import { MockStore } from '../mock-store';
import { getMockExpirationDate } from '../utils';
import {
  addressBookSlice,
  addressBookState,
  anonymousAuthSlice,
  emptyAddressBookSlice,
  loggedInAuthSlice,
} from './CheckoutCommon';

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
const noStepsCompleteOrderState = {
  initialized: true,
  order: {
    ID: 'mockid123',
    Subtotal: 123.45,
    ShippingCost: 0,
    Total: 123.45,
    LineItemCount: 1,
    xp: {
      DeliveryType: 'Ship',
    },
  },
};
NoStepsComplete.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: noStepsCompleteOrderState },
        loggedInAuthSlice,
        addressBookSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const ShippingCompleteSavedAddress = Template.bind({});
const shippingCompleteState = {
  ...noStepsCompleteOrderState,
  shippingAddress: {
    ...addressBookState.addresses.entities['MPcTM2MNzEWi06gLhfMLvQ'],
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
};
ShippingCompleteSavedAddress.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: shippingCompleteState },
        loggedInAuthSlice,
        emptyAddressBookSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const ShippingCompleteNewAddress = Template.bind({});
const shippingCompleteNewAddressState = {
  ...noStepsCompleteOrderState,
  shippingAddress: {
    ID: 'newaddressid',
    AddressName: 'Company',
    Street1: '789 another boulevard',
    City: 'Big City',
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
};
ShippingCompleteNewAddress.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: shippingCompleteNewAddressState },
        loggedInAuthSlice,
        emptyAddressBookSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const ShippingEstimatesComplete = Template.bind({});
const shippingEstimatesCompleteState = {
  ...shippingCompleteState,
  shipEstimateResponse: {
    ...shippingCompleteState.shipEstimateResponse,
    ShipEstimates: [
      {
        ...shippingCompleteState.shipEstimateResponse.ShipEstimates[0],
        SelectedShipMethodID: 'EXPRESS_DELIVERY',
      },
    ],
  },
  order: {
    ...shippingCompleteState.order,
    ShippingCost: 4.99,
    Total: 128.44,
  },
};
ShippingEstimatesComplete.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: shippingEstimatesCompleteState },
        loggedInAuthSlice,
        emptyAddressBookSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const BillingAddressComplete = Template.bind({});
const billingAddressCompleteState = {
  ...shippingEstimatesCompleteState,
  order: {
    ...shippingEstimatesCompleteState.order,
    BillingAddress: {
      ...addressBookState.addresses.entities['MPcTM2MNzEWi06gLhfMLvQ'],
    },
  },
};
BillingAddressComplete.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: billingAddressCompleteState },
        loggedInAuthSlice,
        emptyAddressBookSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const PaymentComplete = Template.bind({});
const paymentCompleteState = {
  ...billingAddressCompleteState,
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
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: paymentCompleteState },
        loggedInAuthSlice,
        emptyAddressBookSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const PickupFromSummit = Template.bind({});
const pickupFromSummitState = {
  ...paymentCompleteState,
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
    ...paymentCompleteState.order,
    xp: {
      DeliveryType: 'PickupFromSummit',
    },
  },
};
PickupFromSummit.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: pickupFromSummitState },
        loggedInAuthSlice,
        emptyAddressBookSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const PickupFromStore = Template.bind({});
const pickupFromStoreState = {
  ...paymentCompleteState,
  shippingAddress: {
    AddressName: 'Store #1234',
    Street1: '110 N. 5th St #300',
    City: 'Minneapolis',
    State: 'MN',
    Country: 'US',
    Zip: '55403',
  },
  order: {
    ...paymentCompleteState.order,
    xp: {
      DeliveryType: 'PickupInStore',
    },
  },
};
PickupFromStore.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: pickupFromStoreState },
        loggedInAuthSlice,
        emptyAddressBookSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const GuestCheckout = Template.bind({});
GuestCheckout.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: noStepsCompleteOrderState },
        anonymousAuthSlice,
        emptyAddressBookSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];
