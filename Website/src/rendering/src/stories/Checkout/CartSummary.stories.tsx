import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CartSummary from '../../components/Checkout/CartSummary';
import { MockStore } from '../mock-store';
import { cartSlice, notInitializedCartSlice } from './CheckoutCommon';

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
      <div className="cart-details">
        <Story />
      </div>
    </MockStore>
  ),
];

export const Loading = Template.bind({});
Loading.args = {
  order: {},
};
Loading.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={notInitializedCartSlice}>
      <div className="cart-details">
        <Story />
      </div>
    </MockStore>
  ),
];
