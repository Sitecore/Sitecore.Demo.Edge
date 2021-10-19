import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InformationPageHero from '../components/InformationPageHero';

export default {
  title: 'Components/InformationPageHero',
  component: InformationPageHero,
} as ComponentMeta<typeof InformationPageHero>;

const Template: ComponentStory<typeof InformationPageHero> = (args) => (
  <InformationPageHero {...args} />
);

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'InformationPageHero',
  },
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Level: {
      value: 'Platinum',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
      },
    },
    FacebookProfileLink: {
      value: 'https://facebook.com/asada',
    },
    TwitterProfileLink: {
      value: 'https://twitter.com/asada',
    },
    InstagramProfileLink: {
      value: 'https://instagram.com/asada',
    },
    LinkedinProfileLink: {
      value: 'https://linkedin.com/asada',
    },
  },
};
