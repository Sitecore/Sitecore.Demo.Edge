import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductCard from '../../components/ShopCommon/ProductCard';

export default {
  title: 'Components/ShopCommon/ProductCard',
  component: ProductCard,
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => <ProductCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  brand: 'CenterCycle',
  final_price: '6.99',
  final_price_min_formatted: 6.99,
  final_price_max_formatted: 6.99,
  image_url: 'https://ch.sitecoredemo.com/api/public/content/bike-hand-pump-product?v=4e0023e4',
  name: 'CenterCycle Hand Pump',
  product_url: '/shop/products/centercycle-hand-pump',
  onClick: () => {
    return null;
  },
  price: '6.99',
};
Default.decorators = [
  (Story) => (
    <ul className="product-list">
      <li className="product-list-item">
        <Story />
      </li>
    </ul>
  ),
];

export const AlternativeTheme = Template.bind({});
AlternativeTheme.args = {
  brand: 'CenterCycle',
  final_price: '6.99',
  final_price_min_formatted: 6.99,
  final_price_max_formatted: 6.99,
  image_url: 'https://ch.sitecoredemo.com/api/public/content/bike-hand-pump-product?v=4e0023e4',
  name: 'CenterCycle Hand Pump',
  product_url: '/shop/products/centercycle-hand-pump',
  onClick: () => {
    return null;
  },
  price: '6.99',
  altTheme: true,
};
AlternativeTheme.decorators = [
  (Story) => (
    <ul className="product-list">
      <li className="product-list-item">
        <Story />
      </li>
    </ul>
  ),
];
