import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LineItemCard from '../../components/Checkout/LineItemCard';
import { MockStore } from '../mock-store';
import { DLineItem } from '../../models/ordercloud/DLineItem';
import { loggedInAuthSlice, cartState, orderSlice, productCacheSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/LineItemCard',
  component: LineItemCard,
} as ComponentMeta<typeof LineItemCard>;

const Template: ComponentStory<typeof LineItemCard> = (args) => <LineItemCard {...args} />;

const slices = [orderSlice, loggedInAuthSlice, productCacheSlice];

export const Default = Template.bind({});
Default.args = {
  editable: true,
  lineItem: cartState.lineItems[0] as DLineItem,
};
Default.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];

export const NonEditable = Template.bind({});
NonEditable.args = {
  editable: false,
  lineItem: cartState.lineItems[0] as DLineItem,
};
NonEditable.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];

export const WithSpecs = Template.bind({});
WithSpecs.args = {
  editable: true,
  lineItem: cartState.lineItems[2] as DLineItem,
};
WithSpecs.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];

export const WithRestrictedQuantities = Template.bind({});
WithRestrictedQuantities.args = {
  editable: true,
  lineItem: cartState.lineItems[3] as DLineItem,
};
WithRestrictedQuantities.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];
