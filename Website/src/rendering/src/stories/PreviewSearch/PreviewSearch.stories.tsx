import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PreviewSearch from '../../components/PreviewSearch/PreviewSearch';

export default {
  title: 'Components/PreviewSearch/PreviewSearch',
  component: PreviewSearch,
} as ComponentMeta<typeof PreviewSearch>;

const Template: ComponentStory<typeof PreviewSearch> = (args) => <PreviewSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
  loaded: false,
  loading: false,
  products: [
    {
      brand: 'CenterCycle',
      breadcrumbs: 'Activities>Cycling>Equipment>Maintenance',
      category_names: ['Maintenance'],
      description: `A universal hand pump that works with the three most popular valves: Schrader, Presta and Dunlop. With its simple design it's easy to use anywhere and anytime. Super compact, making it easy to carry in your bag so you can always inflate tires on the go. The ultra-lightweight pump fits easily into any bicycle or sports equipment bag and comes with an attachment clip allowing you to take it with you anywhere you go.`,
      finalPrice: '6.99',
      id: 406222380,
      image_url:
        '//playsummit.sitecoresandbox.cloud/api/public/content/e78328e35361438aad3006fd03602f52?v=7a328415',
      name: 'CenterCycle Hand Pump',
      price: '6.99',
      product_group: 'PSPCCHP',
      product_url: '/shop/products/centercycle-hand-pump',
      short_description: 'Portable universal hand pump',
      sku: 'PSPCCHP',
      skuid: 1699340652,
    },
  ],
  keyphrase: 'pump',
  trendingCategories: ['equipment', 'maintenance'],
  suggestions: ['pump', 'centercycle foot pump'],
  selectedKeyword: 'pump',
  redirectUrl: '/shop/products?q=',
  inputQuerySelector: '#search-input',
  dispatch: () => {
    return null;
  },
};
