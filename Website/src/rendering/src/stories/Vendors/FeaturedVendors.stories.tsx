import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeaturedVendors from '../../components/Vendors/FeaturedVendors';
import { Vendor } from 'src/types/vendor';

export default {
  title: 'Components/Vendors/FeaturedVendors',
  component: FeaturedVendors,
} as ComponentMeta<typeof FeaturedVendors>;

const Template: ComponentStory<typeof FeaturedVendors> = (args) => <FeaturedVendors {...args} />;

const vendor = {
  Name: 'Item Name',
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Level: {
      value: 'Gold',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
        alt: '',
      },
    },
  },
  url: '/vendors/test',
} as Vendor;

export const Default = Template.bind({});
Default.args = {
  fields: {
    Title: {
      value: 'FEATURED VENDORS',
    },
    Subtitle: {
      value:
        'Road-test the world’s most trusted sports and fitnessequipment–we’ll be welcoming 2,000 brands at this year’s PLAY! Summit.',
    },
    Vendors: [vendor],
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
};
