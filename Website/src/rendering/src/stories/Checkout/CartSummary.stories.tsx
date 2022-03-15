import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CartSummary from '../../components/Checkout/CartSummary';
import { MockStore } from '../mock-store';
import { cartSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/CartSummary',
  component: CartSummary,
} as ComponentMeta<typeof CartSummary>;

const Template: ComponentStory<typeof CartSummary> = (args) => <CartSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  order: {},
};
Default.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={cartSlice}>
      <Story />
    </MockStore>
  ),
];
