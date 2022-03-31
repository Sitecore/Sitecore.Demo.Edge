import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ShipMethodsList from '../../components/Checkout/ShipMethodsList';

export default {
  title: 'Components/Checkout/ShipMethodsList',
  component: ShipMethodsList,
} as ComponentMeta<typeof ShipMethodsList>;

const Template: ComponentStory<typeof ShipMethodsList> = (args) => <ShipMethodsList {...args} />;

export const WithoutSelections = Template.bind({});
WithoutSelections.args = {
  shipMethods: [
    {
      ID: 'STANDARD_DELIVERY',
      Name: 'Standard Delivery',
      Cost: 9.99,
      EstimatedTransitDays: 3,
      xp: {
        Description: 'Receive your order at your home in 3-5 business days',
      },
    },
    {
      ID: 'EXPRESS_DELIVERY',
      Name: 'Express Delivery',
      Cost: 19.99,
      EstimatedTransitDays: 1,
      xp: {
        Description: 'Receive your order at your home in 1-2 business days',
      },
    },
    {
      ID: 'PICKUP_FROM_SUMMIT',
      Name: 'Pick up from the Summit',
      Cost: 0,
      EstimatedTransitDays: 0,
      xp: {
        Description: 'Pick up your order at the summit front desk',
      },
    },
    {
      ID: 'PICKUP_IN_STORE',
      Name: 'Pick up in store',
      Cost: 0,
      EstimatedTransitDays: 0,
      xp: {
        Description: 'Pick up your order in-store',
      },
    },
  ],
  shipEstimateId: 'STATIC_SINGLE_SHIPMENT',
};

export const WithSelections = Template.bind({});
WithSelections.args = {
  shipMethods: [
    {
      ID: 'STANDARD_DELIVERY',
      Name: 'Standard Delivery',
      Cost: 9.99,
      EstimatedTransitDays: 3,
      xp: {
        Description: 'Receive your order at your home in 3-5 business days',
      },
    },
    {
      ID: 'EXPRESS_DELIVERY',
      Name: 'Express Delivery',
      Cost: 19.99,
      EstimatedTransitDays: 1,
      xp: {
        Description: 'Receive your order at your home in 1-2 business days',
      },
    },
    {
      ID: 'PICKUP_FROM_SUMMIT',
      Name: 'Pick up from the Summit',
      Cost: 0,
      EstimatedTransitDays: 0,
      xp: {
        Description: 'Pick up your order at the summit front desk',
      },
    },
    {
      ID: 'PICKUP_IN_STORE',
      Name: 'Pick up in store',
      Cost: 0,
      EstimatedTransitDays: 0,
      xp: {
        Description: 'Pick up your order in-store',
      },
    },
  ],
  shipEstimateId: 'STATIC_SINGLE_SHIPMENT',
  selectedShipMethodId: 'PICKUP_FROM_SUMMIT',
};
