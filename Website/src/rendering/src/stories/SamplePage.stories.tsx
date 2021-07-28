import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '../components/Header';
import { HeaderProps } from '../components/Header';
import HeroSection, { HeroProps } from '../components/HeroSection';
import MainNavigation from '../components/MainNavigation';
import ThreeColumnsSection from '../components/ThreeColumnsSection';
import SponsorsGrid from '../components/SponsorsGrid';

export default {
  title: 'Example/SamplePage',
} as ComponentMeta<typeof HeroSection>;

let headerProps = {} as HeaderProps;
let heroData = {
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

const Template: ComponentStory<typeof HeroSection> = () => {
  return (
    <>
      <div className="header">
        <Header {...headerProps} />
        <MainNavigation />
      </div>
      <HeroSection {...heroData} />
      <ThreeColumnsSection />
      <SponsorsGrid />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
