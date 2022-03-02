import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CartSummary from '../../components/Checkout/CartSummary';
import { MockStore } from '../mock-store';

export default {
  title: 'Components/Checkout/CartSummary',
  component: CartSummary,
} as ComponentMeta<typeof CartSummary>;

const Template: ComponentStory<typeof CartSummary> = (args) => <CartSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  order: {},
};

const mockState = {
  initialized: true,
  order: {
    LineItemCount: 3,
    Subtotal: 24,
  },
};

Default.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState }}>
      <Story />
    </MockStore>
  ),
];
