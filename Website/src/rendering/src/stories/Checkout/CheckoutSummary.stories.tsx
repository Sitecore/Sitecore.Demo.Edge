import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckoutSummary from '../../components/Checkout/CheckoutSummary';
import { MockStore } from '../mock-store';
import { cartSlice, cartState, loggedInAuthSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/CheckoutSummary',
  component: CheckoutSummary,
} as ComponentMeta<typeof CheckoutSummary>;

const Template: ComponentStory<typeof CheckoutSummary> = (args) => <CheckoutSummary {...args} />;

export const WithoutShippingOptionSelected = Template.bind({});
WithoutShippingOptionSelected.args = {
  buttonText: 'Review order',
};

WithoutShippingOptionSelected.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={[cartSlice, loggedInAuthSlice]}>
      <Story />
    </MockStore>
  ),
];

export const WithFreeShippingCost = Template.bind({});
WithFreeShippingCost.args = {
  buttonText: 'Review order',
};

const freeShippingState = {
  ...cartState,
  shipEstimateResponse: {
    ShipEstimates: [
      {
        SelectedShipMethodID: 'mock-shipping-option',
      },
    ],
  },
  order: {
    ShippingCost: 0,
    Subtotal: 123.45,
    LineItemCount: 3,
  },
};

WithFreeShippingCost.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[{ name: 'ocCurrentCart', state: freeShippingState }, loggedInAuthSlice]}
    >
      <Story />
    </MockStore>
  ),
];

export const WithShippingCost = Template.bind({});
WithShippingCost.args = {
  buttonText: 'Review order',
};

const paidShippingState = {
  ...cartState,
  shipEstimateResponse: {
    ShipEstimates: [
      {
        SelectedShipMethodID: 'mock-shipping-option',
      },
    ],
  },
  order: {
    ShippingCost: 12.99,
    Subtotal: 123.45,
    LineItemCount: 3,
  },
};

WithShippingCost.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[{ name: 'ocCurrentCart', state: paidShippingState }, loggedInAuthSlice]}
    >
      <Story />
    </MockStore>
  ),
];
