import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RightColumn from '../../components/PreviewSearch/RightColumn';

export default {
  title: 'Components/PreviewSearch/RightColumn',
  component: RightColumn,
} as ComponentMeta<typeof RightColumn>;

const Template: ComponentStory<typeof RightColumn> = (args) => <RightColumn {...args} />;

export const Default = Template.bind({});
Default.args = {
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
  loading: false,
  selectedKeyword: 'pump',
};
