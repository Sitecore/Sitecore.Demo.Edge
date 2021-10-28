import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import VendorInformationPageHero from '../components/VendorInformationPageHero';

export default {
  title: 'Components/InformationPageHero/VendorInformationPageHero',
  component: VendorInformationPageHero,
} as ComponentMeta<typeof VendorInformationPageHero>;

const Template: ComponentStory<typeof VendorInformationPageHero> = (args) => (
  <VendorInformationPageHero {...args} />
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
    Logo: {
      value: {
        src: 'https://demoedge.sitecoresandbox.cloud/api/public/content/fddf681166144085b1aa1bef893fca9b?v=df31289a&t=profile',
        height: 133,
        width: 600,
      },
    },
    Level: {
      value: 'Featured',
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
    Logo: {
      value: {
        src: '/assets/img/aboutus/fitbit-logo.png',
      },
    },
    Level: {
      value: 'Featured',
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
