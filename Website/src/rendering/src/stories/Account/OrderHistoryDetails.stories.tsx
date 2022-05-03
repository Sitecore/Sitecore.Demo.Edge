import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderHistoryDetails from '../../components/Account/OrderHistoryDetails';

export default {
  title: 'Components/Account/OrderHistoryDetails',
  component: OrderHistoryDetails,
} as ComponentMeta<typeof OrderHistoryDetails>;

const Template: ComponentStory<typeof OrderHistoryDetails> = (args) => <OrderHistoryDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'OrderHistoryDetails',
  },
  rendering: {
    componentName: 'OrderHistoryDetails',
    dataSource: '/sitecore',
  },
};
