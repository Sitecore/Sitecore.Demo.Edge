import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import HeroSection from '../../components/HeroSection';
import Shop from '../../pages/shop';

export default {
  title: 'Pages/Shop Landing Page',
} as ComponentMeta<typeof HeroSection>;

const Template: ComponentStory<typeof HeroSection> = () => {
  return <Shop />;
};

export const Default = Template.bind({});
Default.args = {};
