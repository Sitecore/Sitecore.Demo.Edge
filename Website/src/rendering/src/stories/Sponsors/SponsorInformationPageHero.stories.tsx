import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SponsorInformationPageHero from '../../components/Sponsors/SponsorInformationPageHero';

export default {
  title: 'Components/Sponsors/SponsorInformationPageHero',
  component: SponsorInformationPageHero,
} as ComponentMeta<typeof SponsorInformationPageHero>;

const Template: ComponentStory<typeof SponsorInformationPageHero> = (args) => (
  <SponsorInformationPageHero {...args} />
);

export const WithLargerImage = Template.bind({});
WithLargerImage.args = {
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
      value: 'Platinum',
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
      value: 'Silver',
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
