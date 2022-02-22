import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LineItemCard from '../../components/LineItems/LineItemCard';

export default {
  title: 'Components/LineItems/LineItemCard',
  component: LineItemCard,
} as ComponentMeta<typeof LineItemCard>;

const Template: ComponentStory<typeof LineItemCard> = (args) => <LineItemCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'LineItemCard',
  },
  rendering: {
    componentName: 'LineItemCard',
    dataSource: '/sitecore',
  },
};
