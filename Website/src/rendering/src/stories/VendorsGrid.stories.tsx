import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import VendorsGrid from '../components/VendorsGrid';
import { Vendor } from '../components/FeaturedVendors';

export default {
  title: 'Components/VendorsGrid',
  component: VendorsGrid,
} as ComponentMeta<typeof VendorsGrid>;

const Template: ComponentStory<typeof VendorsGrid> = (args) => <VendorsGrid {...args} />;

const vendor = {
  Name: 'Item Name',
  fields: {
    Name: {
      value: 'Speaker Name',
    },
    Level: {
      value: 'Speaker Role',
    },
    Logo: {
      value: {
        src: '/assets/img/shop/man-biker.jpg',
        alt: '',
      },
    },
  },
} as Vendor;

export const Default = Template.bind({});
Default.args = {
  fields: {
    items: [vendor],
  },
};
