import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PanelShippingEstimates from '../../components/Checkout/PanelShippingEstimates';
import { MockStore } from '../mock-store';
import { DShipEstimateResponse } from 'src/models/ordercloud/DShipEstimateResponse';
import { shipMethods } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/PanelShippingEstimates',
  component: PanelShippingEstimates,
} as ComponentMeta<typeof PanelShippingEstimates>;

const Template: ComponentStory<typeof PanelShippingEstimates> = (args) => (
  <section className="checkout-details shop-container">
    <PanelShippingEstimates {...args} />
  </section>
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
        ShipMethods: shipMethods,
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
