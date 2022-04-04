import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SpeakersGrid from '../../components/Speakers/SpeakersGrid';
import { GraphQLSpeaker } from 'src/types/speaker';

export default {
  title: 'Components/Speakers/SpeakersGrid',
  component: SpeakersGrid,
} as ComponentMeta<typeof SpeakersGrid>;

const Template: ComponentStory<typeof SpeakersGrid> = (args) => <SpeakersGrid {...args} />;

const speakerImage = {
  jsonValue: {
    value: {
      src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/78ef5a244c7c4bcfa129662b4ad93eca?v=1a73b3df&t=profile',
      alt: '',
    },
  },
};

const speaker1 = {
  itemName: 'First Speaker Name',
  name: {
    value: 'First Speaker Name',
  },
  picture: speakerImage,
  featured: {
    value: false,
  },
  jobTitle: {
    value: 'Speaker',
  },
  url: {
    path: '/speaker/Speaker-Name',
  },
} as GraphQLSpeaker;

const speaker2 = {
  itemName: 'Sophia Taylor',
  name: {
    value: 'Sophia Taylor',
  },
  picture: speakerImage,
  featured: {
    value: false,
  },
  jobTitle: {
    value: 'Speaker',
  },
  url: {
    path: '/speaker/Speaker-Name',
  },
} as GraphQLSpeaker;

const speaker3 = {
  itemName: 'Jalen Taylor',
  name: {
    value: 'Jalen Taylor',
  },
  picture: speakerImage,
  featured: {
    value: false,
  },
  jobTitle: {
    value: 'Speaker',
  },
  url: {
    path: '/speaker/Speaker-Name',
  },
} as GraphQLSpeaker;

export const Default = Template.bind({});
Default.args = {
  fields: {
    data: {
      item: {
        children: {
          results: [speaker1, speaker2, speaker3],
        },
      },
    },
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
};
