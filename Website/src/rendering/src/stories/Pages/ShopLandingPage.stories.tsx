import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Shop from '../../pages/shop/index';

export default {
  title: 'Pages/Shop Landing Page',
} as ComponentMeta<typeof Shop>;

const Template: ComponentStory<typeof Shop> = () => {
  return <Shop />;
};

export const Default = Template.bind({});
Default.args = {};
