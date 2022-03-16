import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GiftCheckboxOrder from '../../components/Checkout/GiftCheckboxOrder';
import { MockStore } from '../mock-store';
import { cartSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/GiftCheckboxOrder',
  component: GiftCheckboxOrder,
} as ComponentMeta<typeof GiftCheckboxOrder>;

const Template: ComponentStory<typeof GiftCheckboxOrder> = (args) => (
  <GiftCheckboxOrder {...args} />
);

export const IsGift = Template.bind({});
IsGift.args = {
  order: {
    xp: {
      IsGift: true,
    },
  },
};
IsGift.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={cartSlice}>
      <div className="cart-details">
        <Story />
      </div>
    </MockStore>
  ),
];

export const IsNotGift = Template.bind({});
IsNotGift.args = {
  order: {
    xp: {
      IsGift: false,
    },
  },
};
IsNotGift.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={cartSlice}>
      <div className="cart-details">
        <Story />
      </div>
    </MockStore>
  ),
];
