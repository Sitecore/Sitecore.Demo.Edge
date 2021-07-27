import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeroSection, { HeroProps } from '../components/HeroSection';

export default {
  title: 'Example/HeroSection',
  component: HeroSection,
} as ComponentMeta<typeof HeroSection>;

const Template: ComponentStory<typeof HeroSection> = (args) => <HeroSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    Slogan: {
      value: 'READY | STEADY | PLAY!',
    },
    Expo: {
      value: 'Sports and Leisure Expo',
    },
    Title: {
      value: 'RAISE YOUR GAME',
    },
    Subtitle: {
      value: 'Join us in person or online for the fifth annual PLAY! Summit.',
    },
    Dates: {
      value: 'August 24th – 25th',
    },
    CallToActionLink: {
      value: {
        href: '/tickets',
        text: 'Book Tickets',
      },
    },
  },
} as HeroProps;
