import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SponsorsGrid, { Sponsor } from '../../components/SponsorsGrid';

export default {
  title: 'Components/Sponsors/SponsorsGrid',
  component: SponsorsGrid,
} as ComponentMeta<typeof SponsorsGrid>;

const Template: ComponentStory<typeof SponsorsGrid> = (args) => <SponsorsGrid {...args} />;

const sponsor1 = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
      },
    },
  },
} as Sponsor;

const sponsor2 = {
  Name: 'Item Name',
  fields: {
    Name: {
      value: 'Sports',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-sports.svg',
      },
    },
  },
} as Sponsor;

const sponsor3 = {
  Name: 'Item Name',
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
      },
    },
  },
} as Sponsor;

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
    Sponsors: [sponsor1, sponsor2, sponsor3],
  },
};
