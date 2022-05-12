import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductList from '../../components/ShopCommon/ProductList';

export default {
  title: 'Components/ShopCommon/ProductList',
  component: ProductList,
} as ComponentMeta<typeof ProductList>;

const Template: ComponentStory<typeof ProductList> = (args) => <ProductList {...args} />;

export const Default = Template.bind({});
Default.args = {
  loaded: true,
  loading: false,
  onProductClick: () => {
    return null;
  },
  products: [
    {
      brand: 'CenterCycle',
      breadcrumbs: 'Activities>Cycling>Equipment>Maintenance',
      category_names: ['Maintenance'],
      description: `A universal hand pump that works with the three most popular valves: Schrader, Presta and Dunlop. With its simple design it's easy to use anywhere and anytime. Super compact, making it easy to carry in your bag so you can always inflate tires on the go. The ultra-lightweight pump fits easily into any bicycle or sports equipment bag and comes with an attachment clip allowing you to take it with you anywhere you go.`,
      final_price: '6.99',
      final_price_min_formatted: 6.99,
      final_price_max_formatted: 6.99,
      finalPrice: '6.99',
      id: 406222380,
      image_url: 'https://ch.sitecoredemo.com/api/public/content/bike-hand-pump-product?v=4e0023e4',
      name: 'CenterCycle Hand Pump',
      onClick: () => {
        return null;
      },
      price: '6.99',
      product_group: 'PSPCCHP',
      product_url: '/shop/products/centercycle-hand-pump',
      short_description: 'Portable universal hand pump',
      sku: 'PSPCCHP',
      skuid: 1699340652,
    },
  ],
};
