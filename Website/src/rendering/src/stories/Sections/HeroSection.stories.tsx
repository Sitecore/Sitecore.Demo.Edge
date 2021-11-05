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
    Slogan: {
      value: 'READY | STEADY | PLAY!',
    },
    Eyebrow: {
      value: 'Sports and Recreation Expo',
    },
    Title: {
      value: 'RAISE YOUR GAME',
    },
    Body: {
      value: 'Join us in person or online for the fifth annual PLAY! Summit.',
    },
  },
} as HeroProps;
