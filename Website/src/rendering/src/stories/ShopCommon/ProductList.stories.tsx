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
    {
      brand: 'CenterCycle',
      breadcrumbs: 'Activities>Cycling>Equipment>Maintenance',
      category_names: ['Maintenance'],
      description:
        "The Connection Hose and Valve Adapters kit has all the adapters you need to make your pump work with a wide variety of valves. The kit includes:\n- A universal adapter that fits Schrader, Presta, Dunlop, Woods and most other types of valves\n- A tough vinyl hose that's long enough for many pumps\n- An extension hose for those hard-to-reach valves",
      final_price: '6.99',
      final_price_min_formatted: 6.99,
      final_price_max_formatted: 6.99,
      finalPrice: '6.99',
      id: 1833673129,
      image_url:
        'https://ch.sitecoredemo.com/api/public/content/connection-hose-and-valve-adapters-product?v=20d7e176',
      name: 'Connection Hose and Valve Adapters',
      onClick: () => {
        return null;
      },
      price: '6.99',
      product_group: 'PSPCCCHVA',
      product_url: '/shop/products/PSPCCCHVA/centercycle-connection-hose-and-valve-adapters',
      short_description:
        'Connection Hose and Valve Adapters is a kit that adapts to all types of valves.',
      sku: 'PSPCCCHVA',
      skuid: 1432678581,
    },
    {
      brand: 'CenterCycle',
      breadcrumbs: 'Activities>Cycling>Equipment>Safety',
      category_names: ['Safety'],
      description:
        'This bike lock is a patented, simple and quick to use bike storage system that secures the wheels, saddle and other components of your bike during short stops. It is made from a high-strength polymer and can be used with wider saddles. It weighs 1.3 pounds and comes in at 59.1 inches long.',
      final_price: '14.99',
      final_price_min_formatted: 14.99,
      final_price_max_formatted: 14.99,
      finalPrice: '14.99',
      id: 2062170239,
      image_url:
        'https://ch.sitecoredemo.com/api/public/content/combination-bike-lock-product?v=b355531d',
      name: 'Combination Bike Lock',
      onClick: () => {
        return null;
      },
      price: '14.99',
      product_group: 'PSPCCCBL',
      product_url: '/shop/products/PSPCCCBL/centercycle-combination-bike-lock',
      short_description: 'An affordable and practical coil bike lock for everyday use.',
      sku: 'PSPCCCBL',
      skuid: 1163683593,
    },
  ],
};
