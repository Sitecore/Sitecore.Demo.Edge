import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderReviewDetails from '../../components/Checkout/OrderReviewDetails';
import { MockStore } from '../mock-store';
import { cartState, productCacheSlice, loggedInAuthSlice, shipMethods } from './CheckoutCommon';
import { LineItem } from 'ordercloud-javascript-sdk';

export default {
  title: 'Components/Checkout/OrderReviewDetails',
  component: OrderReviewDetails,
} as ComponentMeta<typeof OrderReviewDetails>;

const Template: ComponentStory<typeof OrderReviewDetails> = () => <OrderReviewDetails />;

export const Default = Template.bind({});
const defaultCartState = {
  ...cartState,
  shipEstimateResponse: {
    ShipEstimates: [
      {
        ID: 'STATIC_SINGLE_SHIPMENT',
        SelectedShipMethodID: 'EXPRESS_DELIVERY',
        ShipMethods: shipMethods,
      },
    ],
  },
  order: {
    ...cartState.order,
    Subtotal: 1069.98,
    ShippingCost: 4.99,
    TaxCost: 256.79,
    Total: 1331.76,
    LineItemCount: 4,
    xp: {
      DeliveryType: 'Ship',
    },
  },
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
  shipEstimateResponse: {
    ShipEstimates: [
      {
        ID: 'STATIC_SINGLE_SHIPMENT',
        SelectedShipMethodID: 'EXPRESS_DELIVERY',
        ShipMethods: shipMethods,
      },
    ],
  },
  order: {
    ...cartState.order,
    Subtotal: 0,
    ShippingCost: 4.99,
    TaxCost: 0,
    Total: 4.99,
    LineItemCount: 0,
    xp: {
      DeliveryType: 'Ship',
    },
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
  shipEstimateResponse: {
    ShipEstimates: [
      {
        ID: 'STATIC_SINGLE_SHIPMENT',
        SelectedShipMethodID: 'EXPRESS_DELIVERY',
        ShipMethods: shipMethods,
      },
    ],
  },
  order: {
    ...cartState.order,
    Subtotal: 1069.98,
    ShippingCost: 4.99,
    TaxCost: 256.79,
    Total: 1331.76,
    LineItemCount: 4,
    xp: {
      DeliveryType: 'Ship',
    },
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
