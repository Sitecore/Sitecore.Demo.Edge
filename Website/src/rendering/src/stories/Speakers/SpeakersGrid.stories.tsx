import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SpeakersGrid from '../../components/SpeakersGrid';
import { GraphQLSpeaker } from 'src/types/speaker';

export default {
  title: 'Components/Speakers/SpeakersGrid',
  component: SpeakersGrid,
} as ComponentMeta<typeof SpeakersGrid>;

const Template: ComponentStory<typeof SpeakersGrid> = (args) => <SpeakersGrid {...args} />;

const speaker1 = {
  itemName: 'First Speaker Name',
  name: {
    value: 'First Speaker Name',
  },
  picture: {
    jsonValue: {
      value: {
        src: '/assets/img/shop/man-biker.jpg',
        alt: '',
      },
    },
  },
  featured: {
    value: false,
  },
  role: {
    value: 'Speaker',
  },
} as GraphQLSpeaker;

const speaker2 = {
  itemName: 'Sophia Taylor',
  name: {
    value: 'Sophia Taylor',
  },
  picture: {
    jsonValue: {
      value: {
        src: '/assets/img/shop/man-biker.jpg',
        alt: '',
      },
    },
  },
  featured: {
    value: false,
  },
  role: {
    value: 'Speaker',
  },
} as GraphQLSpeaker;

const speaker3 = {
  itemName: 'Jalen Taylor',
  name: {
    value: 'Jalen Taylor',
  },
  picture: {
    jsonValue: {
      value: {
        src: '/assets/img/shop/man-biker.jpg',
        alt: '',
      },
    },
  },
  featured: {
    value: false,
  },
  role: {
    value: 'Speaker',
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
};
