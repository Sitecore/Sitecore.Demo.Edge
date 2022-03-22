import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PromoInput from '../../components/Checkout/PromoInput';
import { MockStore } from '../mock-store';
import { cartSlice, productCacheSlice, promotionCartSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/PromoInput',
  component: PromoInput,
} as ComponentMeta<typeof PromoInput>;

const Template: ComponentStory<typeof PromoInput> = (args) => <PromoInput {...args} />;

export const WithoutAppliedPromotions = Template.bind({});
WithoutAppliedPromotions.args = {};
WithoutAppliedPromotions.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={[cartSlice, productCacheSlice]}>
      <div className="cart-details">
        <Story />
      </div>
    </MockStore>
  ),
];

export const WithAppliedPromotions = Template.bind({});
WithAppliedPromotions.args = {};
WithAppliedPromotions.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={[promotionCartSlice, productCacheSlice]}>
      <div className="cart-details">
        <Story />
      </div>
    </MockStore>
  ),
];
