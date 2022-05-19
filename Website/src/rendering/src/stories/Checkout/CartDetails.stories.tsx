import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CartDetails from '../../components/Checkout/CartDetails';
import { MockSlice, MockStore } from '../mock-store';
import { authSlice, cartSlice, productCacheSlice, promotionCartSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/CartDetails',
  component: CartDetails,
} as ComponentMeta<typeof CartDetails>;

const Template: ComponentStory<typeof CartDetails> = (args) => <CartDetails {...args} />;

const slices: MockSlice[] = [cartSlice, productCacheSlice, authSlice];
const promoSlices: MockSlice[] = [promotionCartSlice, productCacheSlice, authSlice];

export const Editable = Template.bind({});
Editable.args = {};
Editable.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];

export const WithPromotions = Template.bind({});
WithPromotions.args = {};
WithPromotions.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={promoSlices}>
      <Story />
    </MockStore>
  ),
];
