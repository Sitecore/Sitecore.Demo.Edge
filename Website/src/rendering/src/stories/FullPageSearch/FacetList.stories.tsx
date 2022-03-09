import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FacetList from '../../components/FullPageSearch/FacetList';

export default {
  title: 'Components/FullPageSearch/FacetList',
  component: FacetList,
} as ComponentMeta<typeof FacetList>;

const Template: ComponentStory<typeof FacetList> = (args) => <FacetList {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'FacetList',
  },
  rendering: {
    componentName: 'FacetList',
    dataSource: '/sitecore',
  },
};
