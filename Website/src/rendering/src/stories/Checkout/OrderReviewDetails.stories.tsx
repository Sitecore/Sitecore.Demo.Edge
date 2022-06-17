import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderReviewDetails from '../../components/Checkout/OrderReviewDetails';
import { MockStore } from '../mock-store';
import { cartState, productCacheSlice, loggedInAuthSlice, shipMethods } from './CheckoutCommon';
import { getMockExpirationDate } from '../utils';

export default {
  title: 'Components/Checkout/OrderReviewDetails',
  component: OrderReviewDetails,
} as ComponentMeta<typeof OrderReviewDetails>;

const Template: ComponentStory<typeof OrderReviewDetails> = (args) => (
  <OrderReviewDetails {...args} />
);

const shippingAddress = {
  ID: 'mockaddressid',
  AddressName: 'Marty Byrde Home',
  Street1: '6818 Gaines Ferry Road',
  City: 'Flowery Branch',
  State: 'GA',
  Zip: '30542',
  Country: 'US',
};

const shipEstimateResponse = {
  ShipEstimates: [
    {
      ID: 'STATIC_SINGLE_SHIPMENT',
      SelectedShipMethodID: 'EXPRESS_DELIVERY',
      ShipMethods: shipMethods,
    },
  ],
};

const billingAddress = {
  ID: 'mockaddressid',
  AddressName: 'Marty Byrde Home',
  Street1: '6818 Gaines Ferry Road',
  City: 'Flowery Branch',
  State: 'GA',
  Zip: '30542',
  Country: 'US',
};

const payments = [
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
];

export const Default = Template.bind({});
const defaultCartState = {
  ...cartState,
  shippingAddress,
  shipEstimateResponse,
  payments,
  order: {
    ID: 'mockorderid',
    Subtotal: 1069.98,
    ShippingCost: 4.99,
    TaxCost: 256.79,
    Total: 1331.76,
    LineItemCount: 4,
    BillingAddress: billingAddress,
    xp: {
      DeliveryType: 'Ship',
    },
  },
};
Default.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: defaultCartState },
        productCacheSlice,
        loggedInAuthSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const NoLineItems = Template.bind({});
const noLineItemsState = {
  initialized: true,
  shippingAddress,
  shipEstimateResponse,
  payments,
  order: {
    ID: 'mockorderid',
    Subtotal: 0,
    ShippingCost: 4.99,
    TaxCost: 0,
    Total: 4.99,
    BillingAddress: billingAddress,
    xp: {
      DeliveryType: 'Ship',
    },
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

export const WithAdditionalComments = Template.bind({});
const withAdditionalCommentsState = {
  ...cartState,
  shippingAddress,
  shipEstimateResponse,
  payments,
  order: {
    ID: 'mockorderid',
    Subtotal: 1069.98,
    ShippingCost: 4.99,
    TaxCost: 256.79,
    Total: 1331.76,
    LineItemCount: 4,
    BillingAddress: billingAddress,
    xp: {
      DeliveryType: 'Ship',
    },
    Comments: 'Please deliver it after 15h',
  },
};
WithAdditionalComments.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: withAdditionalCommentsState },
        productCacheSlice,
        loggedInAuthSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];
