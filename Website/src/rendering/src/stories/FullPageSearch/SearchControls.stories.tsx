import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchControls from '../../components/FullPageSearch/SearchControls';

export default {
  title: 'Components/FullPageSearch/SearchControls',
  component: SearchControls,
} as ComponentMeta<typeof SearchControls>;

const Template: ComponentStory<typeof SearchControls> = (args) => <SearchControls {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'SearchControls',
  },
  rendering: {
    componentName: 'SearchControls',
    dataSource: '/sitecore',
  },
};
