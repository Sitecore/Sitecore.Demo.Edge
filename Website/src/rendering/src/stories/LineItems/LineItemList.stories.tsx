import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LineItemList from '../../components/LineItems/LineItemList';

export default {
  title: 'Components/LineItems/LineItemList',
  component: LineItemList,
} as ComponentMeta<typeof LineItemList>;

const Template: ComponentStory<typeof LineItemList> = (args) => <LineItemList {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'LineItemList',
  },
  rendering: {
    componentName: 'LineItemList',
    dataSource: '/sitecore',
  },
};
