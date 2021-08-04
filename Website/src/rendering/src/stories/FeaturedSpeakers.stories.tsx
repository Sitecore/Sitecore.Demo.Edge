import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeaturedSpeakers from '../components/FeaturedSpeakers';
import { Speaker } from '../components/FeaturedSpeakers';

export default {
  title: 'Components/FeaturedSpeakers',
  component: FeaturedSpeakers,
} as ComponentMeta<typeof FeaturedSpeakers>;

const Template: ComponentStory<typeof FeaturedSpeakers> = (args) => <FeaturedSpeakers {...args} />;

const speaker = {
  Name: 'Item Name',
  fields: {
    Name: {
      value: 'Speaker Name',
    },
    Role: {
      value: 'Speaker Role',
    },
    Picture: {
      value: {
        src: '/assets/img/shop/man-biker.jpg',
        alt: '',
      },
    },
  },
} as Speaker;

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
    Speakers: [speaker],
  },
};
