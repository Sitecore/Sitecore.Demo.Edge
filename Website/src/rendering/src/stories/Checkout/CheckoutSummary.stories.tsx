import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckoutSummary from '../../components/Checkout/CheckoutSummary';
import { MockStore } from '../mock-store';
import { cartSlice, cartState } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/CheckoutSummary',
  component: CheckoutSummary,
} as ComponentMeta<typeof CheckoutSummary>;

const Template: ComponentStory<typeof CheckoutSummary> = (args) => <CheckoutSummary {...args} />;

export const WithoutShippingOptionSelected = Template.bind({});
WithoutShippingOptionSelected.args = {};

WithoutShippingOptionSelected.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={cartSlice}>
      <Story />
    </MockStore>
  ),
];

export const WithFreeShippingCost = Template.bind({});
WithFreeShippingCost.args = {};

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
  },
};

WithFreeShippingCost.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: freeShippingState }}>
      <Story />
    </MockStore>
  ),
];

export const WithShippingCost = Template.bind({});
WithShippingCost.args = {};

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
  },
};

WithShippingCost.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: paidShippingState }}>
      <Story />
    </MockStore>
  ),
];
