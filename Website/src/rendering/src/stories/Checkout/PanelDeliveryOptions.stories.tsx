import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PanelDeliveryOptions from '../../components/Checkout/PanelDeliveryOptions';
import { MockStore } from '../mock-store';

export default {
  title: 'Components/Checkout/PanelDeliveryOptions',
  component: PanelDeliveryOptions,
} as ComponentMeta<typeof PanelDeliveryOptions>;

const Template: ComponentStory<typeof PanelDeliveryOptions> = (args) => (
  <section className="checkout-details shop-container">
    <PanelDeliveryOptions {...args} />
  </section>
);

const mockState = {
  order: {
    xp: {
      DeliveryType: 'Ship',
    },
  },
};

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState }}>
      <Story />
    </MockStore>
  ),
];
