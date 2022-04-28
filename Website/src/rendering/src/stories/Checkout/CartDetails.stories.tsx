import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CartDetails from '../../components/Checkout/CartDetails';
import { MockSlice, MockStore } from '../mock-store';
import {
  authSlice,
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

const slices: MockSlice[] = [cartSlice, productCacheSlice, authSlice];
const promoSlices: MockSlice[] = [promotionCartSlice, productCacheSlice, authSlice];
const loadingSlices: MockSlice[] = [notInitializedCartSlice, productCacheSlice, authSlice];

export const Editable = Template.bind({});
Editable.args = {
  editable: true,
};
Editable.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];

export const NonEditable = Template.bind({});
NonEditable.args = {
  editable: false,
};
NonEditable.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];

export const WithPromotions = Template.bind({});
WithPromotions.args = {
  editable: true,
};
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
