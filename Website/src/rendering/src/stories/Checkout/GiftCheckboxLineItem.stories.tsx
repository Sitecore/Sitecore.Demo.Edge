import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GiftCheckboxLineItem from '../../components/Checkout/GiftCheckboxLineItem';
import { MockStore } from '../mock-store';
import { cartSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/GiftCheckbox',
  component: GiftCheckboxLineItem,
} as ComponentMeta<typeof GiftCheckboxLineItem>;

const Template: ComponentStory<typeof GiftCheckboxLineItem> = (args) => (
  <GiftCheckboxLineItem {...args} />
);

const mockLineItem = {
  ProductID: 'product123',
  Quantity: 1,
  ID: 'mocklineitem',
};

export const IsGift = Template.bind({});
IsGift.args = {
  lineItem: {
    ...mockLineItem,
    xp: {
      IsGift: true,
    },
  },
};
IsGift.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={cartSlice}>
      <Story />
    </MockStore>
  ),
];

export const IsNotGift = Template.bind({});
IsNotGift.args = {
  lineItem: {
    ...mockLineItem,
    xp: {
      IsGift: false,
    },
  },
};
IsNotGift.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={cartSlice}>
      <Story />
    </MockStore>
  ),
];
