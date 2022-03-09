import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FullPageSearch from '../../components/FullPageSearch/FullPageSearch';

export default {
  title: 'Components/FullPageSearch/FullPageSearch',
  component: FullPageSearch,
} as ComponentMeta<typeof FullPageSearch>;

const Template: ComponentStory<typeof FullPageSearch> = (args) => <FullPageSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'FullPageSearch',
  },
  rendering: {
    componentName: 'FullPageSearch',
    dataSource: '/sitecore',
  },
};
