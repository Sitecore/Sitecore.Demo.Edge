import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderReviewDetails from '../../components/Checkout/OrderReviewDetails';
import { MockStore } from '../mock-store';
import {
  cartState,
  productCacheSlice,
  loggedInAuthSlice,
  shipEstimateResponse,
} from './CheckoutCommon';
import { LineItem } from 'ordercloud-javascript-sdk';

export default {
  title: 'Components/Checkout/OrderReviewDetails',
  component: OrderReviewDetails,
} as ComponentMeta<typeof OrderReviewDetails>;

const Template: ComponentStory<typeof OrderReviewDetails> = () => <OrderReviewDetails />;

export const Default = Template.bind({});
const defaultCartState = {
  ...cartState,
  shipEstimateResponse,
};
Default.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: defaultCartState },
        productCacheSlice,
        loggedInAuthSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const NoLineItems = Template.bind({});
const noLineItemsState = {
  ...cartState,
  lineItems: [] as LineItem[],
  shipEstimateResponse,
  order: {
    ...cartState.order,
    Subtotal: 0,
    TaxCost: 0,
    Total: 4.99,
    LineItemCount: 0,
  },
};
NoLineItems.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[{ name: 'ocCurrentCart', state: noLineItemsState }, loggedInAuthSlice]}
    >
      <Story />
    </MockStore>
  ),
];

export const WithAdditionalComments = Template.bind({});
const withAdditionalCommentsState = {
  ...cartState,
  shipEstimateResponse,
  order: {
    ...cartState.order,
    Comments: 'Please deliver it after 15h',
  },
};
WithAdditionalComments.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: withAdditionalCommentsState },
        productCacheSlice,
        loggedInAuthSlice,
      ]}
    >
      <Story />
    </MockStore>
  ),
];
