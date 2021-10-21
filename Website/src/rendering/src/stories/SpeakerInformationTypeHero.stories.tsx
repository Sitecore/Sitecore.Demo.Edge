import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SpeakerInformationTypeHero from '../components/SpeakerInformationTypeHero';

export default {
  title: 'Components/SpeakerInformationTypeHero',
  component: SpeakerInformationTypeHero,
} as ComponentMeta<typeof SpeakerInformationTypeHero>;

const Template: ComponentStory<typeof SpeakerInformationTypeHero> = (args) => (
  <SpeakerInformationTypeHero {...args} />
);

export const Speaker = Template.bind({});
Speaker.args = {
  params: {
    name: 'InformationPageHero',
  },
  fields: {
    Name: {
      value: 'Alex Mena',
    },
    Level: {
      value: 'Featured',
    },
    Logo: {
      value: {
        src: 'https://playsummit.sitecoresandbox.cloud:8443/api/public/content/b966a65f261c4eb48b85e593e608080e?v=4f899992',
        height: 1100,
        width: 1100,
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
