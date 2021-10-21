import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import VendorInformationTypeHero from '../components/VendorInformationTypeHero';

export default {
  title: 'Components/VendorInformationTypeHero',
  component: VendorInformationTypeHero,
} as ComponentMeta<typeof VendorInformationTypeHero>;

const Template: ComponentStory<typeof VendorInformationTypeHero> = (args) => (
  <VendorInformationTypeHero {...args} />
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
