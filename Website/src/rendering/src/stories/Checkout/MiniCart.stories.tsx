import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MiniCart from '../../components/Checkout/MiniCart';
import { MockStore } from '../mock-store';
import { cartSlice, loggedInAuthSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/MiniCart',
  component: MiniCart,
} as ComponentMeta<typeof MiniCart>;

const Template: ComponentStory<typeof MiniCart> = (args) => <MiniCart {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={[cartSlice, loggedInAuthSlice]}>
      <Story />
    </MockStore>
  ),
];
