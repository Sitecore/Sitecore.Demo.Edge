import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeaturedSpeakers, { Speaker } from '../../components/FeaturedSpeakers';

export default {
  title: 'Components/Speakers/FeaturedSpeakers',
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
    Speakers: [speaker],
  },
};
