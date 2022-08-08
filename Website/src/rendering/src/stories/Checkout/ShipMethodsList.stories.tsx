import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ShipMethodsList from '../../components/Checkout/ShipMethodsList';
import { shipMethods } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/ShipMethodsList',
  component: ShipMethodsList,
} as ComponentMeta<typeof ShipMethodsList>;

const Template: ComponentStory<typeof ShipMethodsList> = (args) => <ShipMethodsList {...args} />;

const commonProps = {
  shipMethods: shipMethods,
  shipEstimateId: 'STATIC_SINGLE_SHIPMENT',
};

export const Loading = Template.bind({});
Loading.args = {
  ...commonProps,
  loading: true,
};

export const WithoutSelections = Template.bind({});
WithoutSelections.args = commonProps;

export const WithSelections = Template.bind({});
WithSelections.args = {
  ...commonProps,
  selectedShipMethodId: 'EXPRESS_DELIVERY',
};
