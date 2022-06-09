import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PanelBillingAddress from '../../components/Checkout/PanelBillingAddress';
import { MockStore } from '../mock-store';

export default {
  title: 'Components/Checkout/PanelBillingAddress',
  component: PanelBillingAddress,
} as ComponentMeta<typeof PanelBillingAddress>;

const Template: ComponentStory<typeof PanelBillingAddress> = (args) => (
  <section className="checkout-details shop-container">
    <PanelBillingAddress {...args} />
  </section>
);

export const WithSavedBillingAddress = Template.bind({});
WithSavedBillingAddress.args = {};

const mockState = {
  initialized: true,
  order: {
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
  shippingAddress: {
    ID: 'mockaddressid2',
    AddressName: `Crhistian's Cottage House`,
    Street1: '6580 Sunsplash Dr',
    City: 'Minneapolis',
    State: 'MN',
    Zip: '55912',
    Country: 'US',
  },
};

WithSavedBillingAddress.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState }}>
      <Story />
    </MockStore>
  ),
];

export const WithoutSavedBillingAddress = Template.bind({});
WithoutSavedBillingAddress.args = {};

const mockState2 = {
  initialized: true,
  shippingAddress: {
    ID: 'mockaddressid2',
    AddressName: `Crhistian's Cottage House`,
    Street1: '6580 Sunsplash Dr',
    City: 'Minneapolis',
    State: 'MN',
    Zip: '55912',
    Country: 'US',
  },
};

WithoutSavedBillingAddress.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState2 }}>
      <Story />
    </MockStore>
  ),
];

export const WithSameBillingAsShipping = Template.bind({});
WithSameBillingAsShipping.args = {};

const mockState3 = {
  initialized: true,
  order: {
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
  shippingAddress: {
    ID: 'mockaddressid2',
    AddressName: `Crhistian's Cottage House`,
    Street1: '6580 Sunsplash Dr',
    City: 'Minneapolis',
    State: 'MN',
    Zip: '55912',
    Country: 'US',
  },
};

WithSameBillingAsShipping.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState3 }}>
      <Story />
    </MockStore>
  ),
];

export const WithoutSavedShippingAddress = Template.bind({});
WithoutSavedShippingAddress.args = {};

const mockState4 = {
  initialized: true,
};

WithoutSavedShippingAddress.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState4 }}>
      <Story />
    </MockStore>
  ),
];
