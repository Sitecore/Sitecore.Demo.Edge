import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PreviewSearch from '../../components/PreviewSearch/PreviewSearch';

export default {
  title: 'Components/PreviewSearch/PreviewSearch',
  component: PreviewSearch,
} as ComponentMeta<typeof PreviewSearch>;

const Template: ComponentStory<typeof PreviewSearch> = (args) => <PreviewSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'PreviewSearch',
  },
  rendering: {
    componentName: 'PreviewSearch',
    dataSource: '/sitecore',
  },
};
