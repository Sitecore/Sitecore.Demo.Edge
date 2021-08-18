import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductDetail from '../../components/ProductDetail';

export default {
  title: 'Components/Products/ProductDetail',
  component: ProductDetail,
} as ComponentMeta<typeof ProductDetail>;

const Template: ComponentStory<typeof ProductDetail> = () => <ProductDetail />;

export const Default = Template.bind({});
Default.args = {};
