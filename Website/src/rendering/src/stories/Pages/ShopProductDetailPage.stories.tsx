import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Product from '../../pages/shop/product';

export default {
  title: 'Pages/Shop Product Detail Page',
} as ComponentMeta<typeof Product>;

const Template: ComponentStory<typeof Product> = () => {
  return <Product />;
};

export const Default = Template.bind({});
Default.args = {};
