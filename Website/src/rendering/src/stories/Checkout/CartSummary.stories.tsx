import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CartSummary from '../../components/Checkout/CartSummary';

export default {
  title: 'Components/Checkout/CartSummary',
  component: CartSummary,
} as ComponentMeta<typeof CartSummary>;

const Template: ComponentStory<typeof CartSummary> = (args) => <CartSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'CartSummary',
  },
  rendering: {
    componentName: 'CartSummary',
    dataSource: '/sitecore',
  },
};
