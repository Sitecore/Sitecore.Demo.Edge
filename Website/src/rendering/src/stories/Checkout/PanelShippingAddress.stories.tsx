import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MockStore } from '../mock-store';
import PanelShippingAddress from '../../components/Checkout/PanelShippingAddress';

export default {
  title: 'Components/Checkout/PanelShippingAddress',
  component: PanelShippingAddress,
} as ComponentMeta<typeof PanelShippingAddress>;

const Template: ComponentStory<typeof PanelShippingAddress> = (args) => (
  <section className="checkout-details shop-container">
    <PanelShippingAddress {...args} />
  </section>
);

export const WithSavedAddress = Template.bind({});
WithSavedAddress.args = {};

const mockState = {
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
};

WithSavedAddress.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState }}>
      <Story />
    </MockStore>
  ),
];

export const WithoutSavedAddress = Template.bind({});
WithSavedAddress.args = {};

const mockState2 = {
  initialized: true,
};

WithoutSavedAddress.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState2 }}>
      <Story />
    </MockStore>
  ),
];
