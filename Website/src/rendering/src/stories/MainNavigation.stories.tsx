import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainNavigation from '../components/MainNavigation';

export default {
  title: 'Components/MainNavigation',
  component: MainNavigation,
} as ComponentMeta<typeof MainNavigation>;

const Template: ComponentStory<typeof MainNavigation> = () => <MainNavigation />;

export const Default = Template.bind({});
Default.args = {};
