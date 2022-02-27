import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LeftColumn from '../../components/PreviewSearch/LeftColumn';

export default {
  title: 'Components/PreviewSearch/LeftColumn',
  component: LeftColumn,
} as ComponentMeta<typeof LeftColumn>;

const Template: ComponentStory<typeof LeftColumn> = (args) => <LeftColumn {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'LeftColumn',
  },
  rendering: {
    componentName: 'LeftColumn',
    dataSource: '/sitecore',
  },
};
