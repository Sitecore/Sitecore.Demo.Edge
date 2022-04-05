import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FullPageSearch from '../../components/FullPageSearch/FullPageSearch';

export default {
  title: 'Components/FullPageSearch/FullPageSearch',
  component: FullPageSearch,
} as ComponentMeta<typeof FullPageSearch>;

const Template: ComponentStory<typeof FullPageSearch> = (args) => <FullPageSearch {...args} />;

const exampleFacet = {
  display_name: 'Price',
  facetType: 'price',
  number_of_products: 8,
  value: [
    {
      count: 2,
      id: 'facet_ideyJtYXgiOjE1LCJtaW4iOjV9',
      in_content: 'product',
      max: 15,
      min: 5,
      text: '5 - 15',
    },
  ],
};

export const Default = Template.bind({});
Default.args = {
  dispatch: () => {
    return null;
  },
  facets: [exampleFacet],
  keyphrase: 'pump',
  loaded: true,
  loading: false,
  page: 1,
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
      image_url:
        '//playsummit.sitecoresandbox.cloud/api/public/content/e78328e35361438aad3006fd03602f52?v=7a328415',
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
  sortChoices: [
    {
      label: 'Featured ASC',
      name: 'featured',
      order: 'asc',
    },
  ],
  totalItems: 8,
  totalPages: 1,
};
