import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Section from '../../components/Section';
import SpeakersGrid, { Speaker, SpeakersGridProps } from '../../components/SpeakersGrid';

export default {
  title: 'Components/Sections/Section',
  component: Section,
} as ComponentMeta<typeof Section>;

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

const speakerProps = {
  fields: {
    items: [speaker],
  },
} as SpeakersGridProps;

const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args}>
    <SpeakersGrid {...speakerProps} />
  </Section>
);

export const Default = Template.bind({});
Default.args = {
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
