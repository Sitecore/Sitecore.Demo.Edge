import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Section from '../../components/Page Content/Section';
import SpeakersGrid, { SpeakersGridProps } from '../../components/Speakers/SpeakersGrid';
import { GraphQLSpeaker } from 'src/types/speaker';

export default {
  title: 'Components/Page Content/Section',
  component: Section,
} as ComponentMeta<typeof Section>;

const speakerImage = {
  jsonValue: {
    value: {
      src: '/assets/img/Alex-Mena.png',
      alt: '',
    },
  },
};

const speaker = {
  itemName: 'Speaker Name',
  name: {
    value: 'Speaker Name',
  },
  picture: speakerImage,
  featured: {
    value: true,
  },
  jobTitle: {
    value: 'Speaker',
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
