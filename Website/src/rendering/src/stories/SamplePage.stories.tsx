import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '../components/Header';
import { HeaderProps } from '../components/Header';
import HeroSection from '../components/HeroSection';
import MainNavigation from '../components/MainNavigation';
import ThreeColumnsSection from '../components/ThreeColumnsSection';
import SponsorsGrid from '../components/SponsorsGrid';

export default {
  title: 'Example/SamplePage',
} as ComponentMeta<typeof HeroSection>;

let headerProps = {} as HeaderProps;

const Template: ComponentStory<typeof HeroSection> = () => {
  return (
    <>
      <div className="header">
        <Header {...headerProps} />
        <MainNavigation />
      </div>
      <HeroSection />
      <ThreeColumnsSection />
      <SponsorsGrid />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
