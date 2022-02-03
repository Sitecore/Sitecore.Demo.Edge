import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SponsorsGrid from '../../components/Sponsors/SponsorsGrid';
import { Sponsor } from 'src/types/sponsor';

export default {
  title: 'Components/Sponsors/SponsorsGrid',
  component: SponsorsGrid,
} as ComponentMeta<typeof SponsorsGrid>;

const Template: ComponentStory<typeof SponsorsGrid> = (args) => <SponsorsGrid {...args} />;

const fitbit = {
  Name: 'Fitbit',
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
        alt: '',
      },
    },
  },
  url: '/sponsors/test',
} as Sponsor;

const sports = {
  Name: 'Sports',
  fields: {
    Name: {
      value: 'Sports',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-sports.svg',
        alt: '',
      },
    },
  },
  url: '/sponsors/test',
} as Sponsor;

export const Default = Template.bind({});
Default.args = {
  fields: {
    items: [fitbit, sports],
  },
  rendering: {
    componentName: 'SponsorsGrid',
    dataSource: '/sitecore',
  },
};
