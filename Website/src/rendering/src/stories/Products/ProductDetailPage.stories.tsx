import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductDetailPage from '../../components/Products/ProductDetailPage';

export default {
  title: 'Components/Products/ProductDetailPage',
  component: ProductDetailPage,
} as ComponentMeta<typeof ProductDetailPage>;

const Template: ComponentStory<typeof ProductDetailPage> = (args) => <ProductDetailPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'ProductDetailPage',
  },
  rendering: {
    componentName: 'ProductDetailPage',
    dataSource: '/sitecore',
  },
};
