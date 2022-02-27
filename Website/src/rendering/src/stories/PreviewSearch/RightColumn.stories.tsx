import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RightColumn from '../../components/PreviewSearch/RightColumn';

export default {
  title: 'Components/PreviewSearch/RightColumn',
  component: RightColumn,
} as ComponentMeta<typeof RightColumn>;

const Template: ComponentStory<typeof RightColumn> = (args) => <RightColumn {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'RightColumn',
  },
  rendering: {
    componentName: 'RightColumn',
    dataSource: '/sitecore',
  },
};
