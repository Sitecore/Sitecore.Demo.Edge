import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderSummary, { OrderSummaryProps } from '../../components/Payment/OrderSummary';

export default {
  title: 'Components/Payment/OrderSummary',
  component: OrderSummary,
} as ComponentMeta<typeof OrderSummary>;

const Template: ComponentStory<typeof OrderSummary> = (args?: OrderSummaryProps) => (
  <OrderSummary {...args} />
);

export const WithFees = Template.bind({});
WithFees.args = {
  ticket: '0',
};

export const WithoutFees = Template.bind({});
WithoutFees.args = {
  ticket: '3',
};
