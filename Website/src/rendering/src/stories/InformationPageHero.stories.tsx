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

export const WithLargerImage = Template.bind({});
WithLargerImage.args = {
  params: {
    name: 'InformationPageHero',
  },
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Level: {
      value: 'Featured',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
        height: 133,
        width: 600,
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

export const WithSmallerImage = Template.bind({});
WithSmallerImage.args = {
  params: {
    name: 'InformationPageHero',
  },
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Level: {
      value: 'Featured',
    },
    Logo: {
      value: {
        src: '/assets/img/aboutus/fitbit-logo.png',
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
