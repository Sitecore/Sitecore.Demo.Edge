import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductList from '../../components/FullPageSearch/ProductList';

export default {
  title: 'Components/FullPageSearch/ProductList',
  component: ProductList,
} as ComponentMeta<typeof ProductList>;

const Template: ComponentStory<typeof ProductList> = (args) => <ProductList {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'ProductList',
  },
  rendering: {
    componentName: 'ProductList',
    dataSource: '/sitecore',
  },
};
