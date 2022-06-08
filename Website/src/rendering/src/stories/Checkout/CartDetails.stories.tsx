import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CartDetails from '../../components/Checkout/CartDetails';
import { MockSlice, MockStore } from '../mock-store';
import {
  loggedInAuthSlice,
  cartSlice,
  notInitializedCartSlice,
  productCacheSlice,
  promotionCartSlice,
} from './CheckoutCommon';

export default {
  title: 'Components/Checkout/CartDetails',
  component: CartDetails,
} as ComponentMeta<typeof CartDetails>;

const Template: ComponentStory<typeof CartDetails> = (args) => <CartDetails {...args} />;

const slices: MockSlice[] = [cartSlice, productCacheSlice, loggedInAuthSlice];
const promoSlices: MockSlice[] = [promotionCartSlice, productCacheSlice, loggedInAuthSlice];
const loadingSlices: MockSlice[] = [notInitializedCartSlice, productCacheSlice, loggedInAuthSlice];

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

export const Loading = Template.bind({});
Loading.args = {
  editable: true,
};
Loading.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={loadingSlices}>
      <Story />
    </MockStore>
  ),
];
