import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import VendorsGrid from '../../components/Vendors/VendorsGrid';
import { Vendor } from 'src/types/vendor';

export default {
  title: 'Components/Vendors/VendorsGrid',
  component: VendorsGrid,
} as ComponentMeta<typeof VendorsGrid>;

const Template: ComponentStory<typeof VendorsGrid> = (args) => <VendorsGrid {...args} />;

const fitbit = {
  Name: 'Fitbit',
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Level: {
      value: 'Vendor Level',
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

const sports = {
  Name: 'Sports',
  fields: {
    Name: {
      value: 'Sports',
    },
    Level: {
      value: 'Vendor Level',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-sports.svg',
        alt: '',
      },
    },
  },
  url: '/vendors/test',
} as Vendor;

export const Default = Template.bind({});
Default.args = {
  fields: {
    items: [fitbit, sports],
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
};
