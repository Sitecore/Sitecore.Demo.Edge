import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PanelShippingEstimates from '../../components/Checkout/PanelShippingEstimates';
import { MockStore } from '../mock-store';
import { DShipEstimateResponse } from 'src/models/ordercloud/DShipEstimateResponse';

export default {
  title: 'Components/Checkout/PanelShippingEstimates',
  component: PanelShippingEstimates,
} as ComponentMeta<typeof PanelShippingEstimates>;

const Template: ComponentStory<typeof PanelShippingEstimates> = (args) => (
  <PanelShippingEstimates {...args} />
);

const mockState = {
  initialized: true,
  shipEstimateResponse: {
    ShipEstimates: [
      {
        ID: 'STATIC_SINGLE_SHIPMENT',
        ShipEstimateItems: [
          {
            LineItemID: 'X001',
            Quantity: 2,
          },
        ],
        ShipMethods: [
          {
            ID: 'STANDARD_DELIVERY',
            Name: 'Standard Delivery',
            Cost: 0,
            EstimatedTransitDays: 3,
            xp: {
              Description: 'Receive your order at your home in 3-5 business days',
            },
          },
          {
            ID: 'EXPRESS_DELIVERY',
            Name: 'Express Delivery',
            Cost: 4.99,
            EstimatedTransitDays: 2,
            xp: {
              Description: 'Receive your order at your home in 1-2 business days',
            },
          },
          {
            ID: 'ONEDAY_DELIVERY',
            Name: 'One day delivery',
            Cost: 9.99,
            EstimatedTransitDays: 2,
            xp: {
              Description: 'Receive your order at your home the next business day',
            },
          },
        ],
      },
    ],
    HttpStatusCode: 200,
    UnhandledErrorBody: null,
    xp: {},
  } as DShipEstimateResponse,
};

export const WithoutSelections = Template.bind({});
WithoutSelections.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockState }}>
      <Story />
    </MockStore>
  ),
];

export const WithSelections = Template.bind({});
const mockStateClone = JSON.parse(JSON.stringify(mockState));
mockStateClone.shipEstimateResponse.ShipEstimates[0].SelectedShipMethodID = 'EXPRESS_DELIVERY';
WithSelections.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockStateClone }}>
      <Story />
    </MockStore>
  ),
];
