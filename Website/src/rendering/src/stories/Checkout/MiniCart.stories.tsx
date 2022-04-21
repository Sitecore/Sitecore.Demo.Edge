import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MiniCart from '../../components/Checkout/MiniCart';
import { MockSlice, MockStore } from '../mock-store';
import { cartSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/MiniCart',
  component: MiniCart,
} as ComponentMeta<typeof MiniCart>;

const Template: ComponentStory<typeof MiniCart> = (args) => <MiniCart {...args} />;

const slices: MockSlice[] = [cartSlice];

export const Default = Template.bind({});
Default.args = {
  editable: true,
};
Default.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];
