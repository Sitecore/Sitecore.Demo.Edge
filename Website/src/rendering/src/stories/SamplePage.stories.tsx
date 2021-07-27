import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeroSection from '../components/HeroSection';
import MainNavigation from '../components/MainNavigation';
import ThreeColumnsSection from '../components/ThreeColumnsSection';
import SponsorsGrid from '../components/SponsorsGrid';

export default {
  title: 'Example/SamplePage',
} as ComponentMeta<typeof HeroSection>;

const Template: ComponentStory<typeof HeroSection> = () => {
  return (
    <>
      <MainNavigation />
      <HeroSection />
      <ThreeColumnsSection />
      <SponsorsGrid />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
