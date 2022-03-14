import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MockStore } from '../mock-store';
import PanelShippingAddress from '../../components/Checkout/PanelShippingAddress';

export default {
  title: 'Components/Checkout/PanelShippingAddress',
  component: PanelShippingAddress,
} as ComponentMeta<typeof PanelShippingAddress>;

const Template: ComponentStory<typeof PanelShippingAddress> = (args) => (
  <PanelShippingAddress {...args} />
);

export const Default = Template.bind({});
Default.args = {};

const mockState = {
  initialized: true,
  shippingAddress: {
    AddressName: 'Marty Byrde Home',
    Street1: '6818 Gaines Ferry Road',
    City: 'Flowery Branch',
    State: 'GA',
    Zip: '30542',
    Country: 'US',
  },
};

Default.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState }}>
      <Story />
    </MockStore>
  ),
];
