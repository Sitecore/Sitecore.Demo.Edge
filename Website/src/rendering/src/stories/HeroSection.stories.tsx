import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeroSection  from '../components/HeroSection';

export default {
  title: 'Example/HeroSection',
  component: HeroSection,
} as ComponentMeta<typeof HeroSection>;

const Template: ComponentStory<typeof HeroSection> = () => <HeroSection />;

export const Default = Template.bind({});
Default.args = {};
