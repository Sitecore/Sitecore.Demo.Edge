import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeroSection, { HeroProps } from '../../components/HeroSection';

export default {
  title: 'Components/Sections/HeroSection',
  component: HeroSection,
} as ComponentMeta<typeof HeroSection>;

const Template: ComponentStory<typeof HeroSection> = (args: HeroProps) => <HeroSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    Logo: {
      value: {
        src: '/assets/img/play-logo-wide-light.svg',
      },
    },
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
    When: {
      value: 'August 24th – 25th',
    },
    Link: {
      value: {
        href: '/tickets',
        text: 'Book Tickets',
      },
    },
  },
} as HeroProps;
