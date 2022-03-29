import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckoutSummary from '../../components/Checkout/CheckoutSummary';
import { MockStore } from '../mock-store';

export default {
  title: 'Components/Checkout/CheckoutSummary',
  component: CheckoutSummary,
} as ComponentMeta<typeof CheckoutSummary>;

const Template: ComponentStory<typeof CheckoutSummary> = (args) => <CheckoutSummary {...args} />;

export const WithoutShippingOptionSelected = Template.bind({});
WithoutShippingOptionSelected.args = {};

const mockstate1 = {
  initialized: true,
  order: {
    ID: 'mock-id',
    Subtotal: 123.45,
  },
};

WithoutShippingOptionSelected.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockstate1 }}>
      <Story />
    </MockStore>
  ),
];

export const WithFreeShippingCost = Template.bind({});
WithFreeShippingCost.args = {};

const mockstate2 = {
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
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockstate2 }}>
      <Story />
    </MockStore>
  ),
];

export const WithShippingCost = Template.bind({});
WithShippingCost.args = {};

const mockstate3 = {
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
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockstate3 }}>
      <Story />
    </MockStore>
  ),
];
