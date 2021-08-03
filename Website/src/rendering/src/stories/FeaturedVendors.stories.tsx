import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeaturedVendors from '../components/FeaturedVendors';
import { Vendor } from '../components/FeaturedVendors';

export default {
  title: 'Components/FeaturedVendors',
  component: FeaturedVendors,
} as ComponentMeta<typeof FeaturedVendors>;

const Template: ComponentStory<typeof FeaturedVendors> = (args) => <FeaturedVendors {...args} />;

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
    Title: {
      value: 'FEATURED SPEAKERS',
    },
    Subtitle: {
      value:
        'Road-test the world’s most trusted sports and fitnessequipment–we’ll be welcoming 2,000 brands at this year’s PLAY! Summit.',
    },
    Vendors: [vendor],
  },
};
