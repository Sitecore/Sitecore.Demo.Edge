import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Products from '../../pages/shop/products';

export default {
  title: 'Pages/Shop Products Listing Page',
} as ComponentMeta<typeof Products>;

const Template: ComponentStory<typeof Products> = () => {
  return <Products />;
};

export const Default = Template.bind({});
Default.args = {};
