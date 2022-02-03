import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeaturedSpeakers from '../../components/Speakers/FeaturedSpeakers';
import { GraphQLSpeaker } from 'src/types/speaker';

export default {
  title: 'Components/Speakers/FeaturedSpeakers',
  component: FeaturedSpeakers,
} as ComponentMeta<typeof FeaturedSpeakers>;

const Template: ComponentStory<typeof FeaturedSpeakers> = (args) => <FeaturedSpeakers {...args} />;

const speakerImage = {
  jsonValue: {
    value: {
      src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/78ef5a244c7c4bcfa129662b4ad93eca?v=1a73b3df&t=profile',
      alt: '',
    },
  },
};

const speaker = {
  name: {
    value: 'First Speaker Name',
  },
  picture: speakerImage,
  featured: {
    value: true,
  },
  jobTitle: {
    value: 'Creative Director',
  },
  url: {
    path: '/speaker/Speaker-Name',
  },
} as GraphQLSpeaker;

const speaker1 = {
  name: {
    value: 'Second Speaker',
  },
  picture: speakerImage,
  featured: {
    value: true,
  },
  jobTitle: {
    value: 'Pro Basketball Player',
  },
  url: {
    path: '/speaker/Speaker-Name',
  },
} as GraphQLSpeaker;

const speaker2 = {
  name: {
    value: 'Third Speaker',
  },
  picture: speakerImage,
  featured: {
    value: true,
  },
  jobTitle: {
    value: 'Chief Product Officer',
  },
  url: {
    path: '/speaker/Speaker-Name',
  },
} as GraphQLSpeaker;

const speaker3 = {
  name: {
    value: 'Another Speaker',
  },
  picture: speakerImage,
  featured: {
    value: true,
  },
  jobTitle: {
    value: 'Social Influencer',
  },
  url: {
    path: '/speaker/Speaker-Name',
  },
} as GraphQLSpeaker;

const speaker4 = {
  name: {
    value: 'Last Speaker',
  },
  picture: speakerImage,
  featured: {
    value: true,
  },
  jobTitle: {
    value: 'Professional Cyclist',
  },
  url: {
    path: '/speaker/Speaker-Name',
  },
} as GraphQLSpeaker;

export const Default = Template.bind({});
Default.args = {
  fields: {
    data: {
      source: {
        numberOfSpeakers: {
          value: 6,
        },
      },
      item: {
        children: {
          results: [speaker, speaker1, speaker2, speaker3, speaker4, speaker2, speaker1],
        },
      },
    },
  },
};
