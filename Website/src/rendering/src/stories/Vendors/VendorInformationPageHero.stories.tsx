import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import VendorInformationPageHero from '../../components/Vendors/VendorInformationPageHero';

export default {
  title: 'Components/Vendors/VendorInformationPageHero',
  component: VendorInformationPageHero,
} as ComponentMeta<typeof VendorInformationPageHero>;

const Template: ComponentStory<typeof VendorInformationPageHero> = (args) => (
  <VendorInformationPageHero {...args} />
);

export const WithLargerImage = Template.bind({});
WithLargerImage.args = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Logo: {
      value: {
        src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/d3017c080d6a4c84b7da67d2fb849bc8?v=489bba8a&t=profile',
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
        src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/cd9887afd5f249c2a77bc62a506ed667?v=6aea2ec4',
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
