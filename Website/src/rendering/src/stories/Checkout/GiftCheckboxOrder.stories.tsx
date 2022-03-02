import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GiftCheckboxOrder from '../../components/Checkout/GiftCheckboxOrder';
import { MockStore } from '../mock-store';

export default {
  title: 'Components/Checkout/GiftCheckboxOrder',
  component: GiftCheckboxOrder,
} as ComponentMeta<typeof GiftCheckboxOrder>;

const Template: ComponentStory<typeof GiftCheckboxOrder> = (args) => (
  <GiftCheckboxOrder {...args} />
);
const mockState = {};

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
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState }}>
      <Story />
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
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState }}>
      <Story />
    </MockStore>
  ),
];
