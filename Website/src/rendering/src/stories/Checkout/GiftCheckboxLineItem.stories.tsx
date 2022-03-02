import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GiftCheckboxLineItem from '../../components/Checkout/GiftCheckboxLineItem';
import { MockStore } from '../mock-store';

export default {
  title: 'Components/Checkout/GiftCheckbox',
  component: GiftCheckboxLineItem,
} as ComponentMeta<typeof GiftCheckboxLineItem>;

const Template: ComponentStory<typeof GiftCheckboxLineItem> = (args) => (
  <GiftCheckboxLineItem {...args} />
);

const mockState = {};

export const IsGift = Template.bind({});
IsGift.args = {
  lineItem: {
    ProductID: 'product123',
    Quantity: 1,
    ID: 'mocklineitem',
    xp: {
      IsGift: true,
    },
  },
};
IsGift.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState }}>
      <Story />
    </MockStore>
  ),
];

export const IsNotGift = Template.bind({});
IsNotGift.args = {
  lineItem: {
    ProductID: 'product123',
    Quantity: 1,
    ID: 'mocklineitem',
    xp: {
      IsGift: false,
    },
  },
};
IsNotGift.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState }}>
      <Story />
    </MockStore>
  ),
];
