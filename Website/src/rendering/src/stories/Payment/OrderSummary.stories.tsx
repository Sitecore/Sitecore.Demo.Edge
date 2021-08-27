import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderSummary from '../../components/OrderSummary';

export default {
  title: 'Components/Payment/OrderSummary',
  component: OrderSummary,
} as ComponentMeta<typeof OrderSummary>;

const Template: ComponentStory<typeof OrderSummary> = () => <OrderSummary />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'OrderSummary',
  },
};
