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
        src: 'https://playsummit.sitecoresandbox.cloud:8443/api/public/content/8f466142f88c4d5c87e29461eddc222f?v=7a63a542',
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
