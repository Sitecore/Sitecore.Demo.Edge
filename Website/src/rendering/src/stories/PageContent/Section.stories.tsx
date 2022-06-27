import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Section from '../../components/PageContent/Section';
import SpeakersGrid, { SpeakersGridProps } from '../../components/Speakers/SpeakersGrid';
import { GraphQLSpeaker } from 'src/types/speaker';

export default {
  title: 'Components/PageContent/Section',
  component: Section,
} as ComponentMeta<typeof Section>;

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
    value: 'Speaker Name',
  },
  picture: speakerImage,
  featured: {
    value: true,
  },
  jobTitle: {
    value: 'Speaker',
  },
  url: {
    path: '/speaker/Speaker-Name',
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
      value: 'section-speakers',
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

export const DarkPatternBackground = Template.bind({});
DarkPatternBackground.args = {
  fields: {
    cssClass: {
      value: 'section-dark-pattern',
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

export const LightPatternBackground = Template.bind({});
LightPatternBackground.args = {
  fields: {
    cssClass: {
      value: 'section-light-pattern',
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

export const DarkNews = Template.bind({});
DarkNews.args = {
  fields: {
    cssClass: {
      value: 'section-news',
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
