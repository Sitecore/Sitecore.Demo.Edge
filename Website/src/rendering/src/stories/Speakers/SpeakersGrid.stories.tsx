import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SpeakersGrid, { Speaker } from '../../components/SpeakersGrid';

export default {
  title: 'Components/Speakers/SpeakersGrid',
  component: SpeakersGrid,
} as ComponentMeta<typeof SpeakersGrid>;

const Template: ComponentStory<typeof SpeakersGrid> = (args) => <SpeakersGrid {...args} />;

const speaker1 = {
  fields: {
    Name: {
      value: 'Mary Asada',
    },
    Role: {
      value: 'Athlete',
    },
    Picture: {
      value: {
        src: 'https://mint.stylelabs.io/api/public/content/71277d3734f9479fae9b22e58d36e217?v=8f834e76',
      },
    },
    Featured: { value: true },
  },
} as Speaker;

const speaker2 = {
  fields: {
    Name: {
      value: 'Sophia Taylor',
    },
    Role: {
      value: 'Speaker',
    },
    Picture: {
      value: {
        src: 'https://mint.stylelabs.io/api/public/content/4b034f1b321b46f5be2235353e040aab?v=b291dcc7',
      },
    },
    Featured: { value: false },
  },
} as Speaker;

const speaker3 = {
  fields: {
    Name: {
      value: 'Jalen Williams',
    },
    Role: {
      value: 'Social Influencer',
    },
    Picture: {
      value: {
        src: 'https://mint.stylelabs.io/api/public/content/2677490fbdcf4d6dad717664b05b784e?v=67cf9134',
      },
    },
    Featured: { value: true },
  },
} as Speaker;

export const Default = Template.bind({});
Default.args = {
  fields: {
    items: [speaker1, speaker2, speaker3],
  },
};
