import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Section from '../../components/Section';
import SpeakersGrid, { SpeakersGridProps } from '../../components/SpeakersGrid';
import { GraphQLSpeaker } from 'src/types/speaker';

export default {
  title: 'Components/Sections/Section',
  component: Section,
} as ComponentMeta<typeof Section>;

const speaker = {
  itemName: 'Item Name',
  name: {
    value: 'Item Name',
  },
  picture: {
    jsonValue: {
      value: {
        src: '/assets/img/shop/man-biker.jpg',
      },
    },
  },
  featured: {
    value: true,
  },
  role: {
    value: 'Speaker Role',
  },
} as GraphQLSpeaker;

const speakerProps = {
  fields: {
    data: {
      item: {
        children: {
          results: [speaker, speaker, speaker, speaker],
        },
      },
    },
  },
} as SpeakersGridProps;

const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args}>
    <SpeakersGrid {...speakerProps} />
  </Section>
);

export const LightSpeakers = Template.bind({});
LightSpeakers.args = {
  fields: {
    cssClass: {
      value: 'section__speakers',
    },
    brightness: {
      value: 'light',
    },
    title: {
      value: 'Section',
    },
    content: {
      value: 'Section Content',
    },
    callToActionLink: {
      value: {
        href: '/speakers',
        text: 'View Speakers',
      },
    },
  },
};

export const Light = Template.bind({});
Light.args = {
  fields: {
    cssClass: {
      value: '',
    },
    brightness: {
      value: 'light',
    },
    title: {
      value: 'Section',
    },
    content: {
      value: 'Section Content',
    },
    callToActionLink: {
      value: {
        href: '/speakers',
        text: 'View Speakers',
      },
    },
  },
};

export const Dark = Template.bind({});
Dark.args = {
  fields: {
    cssClass: {
      value: '',
    },
    brightness: {
      value: 'dark',
    },
    title: {
      value: 'Section',
    },
    content: {
      value: 'Section Content',
    },
    callToActionLink: {
      value: {
        href: '/speakers',
        text: 'View Speakers',
      },
    },
  },
};

export const DarkNews = Template.bind({});
DarkNews.args = {
  fields: {
    cssClass: {
      value: 'section__news',
    },
    brightness: {
      value: 'dark',
    },
    title: {
      value: 'Section',
    },
    content: {
      value: 'Section Content',
    },
    callToActionLink: {
      value: {
        href: '/speakers',
        text: 'View Speakers',
      },
    },
  },
};
