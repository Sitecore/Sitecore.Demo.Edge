import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Products from '../../components/PreviewSearch/Products';

export default {
  title: 'Components/PreviewSearch/Products',
  component: Products,
} as ComponentMeta<typeof Products>;

const Template: ComponentStory<typeof Products> = (args) => <Products {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'Products',
  },
  rendering: {
    componentName: 'Products',
    dataSource: '/sitecore',
  },
};
