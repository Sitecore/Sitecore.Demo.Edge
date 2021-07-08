import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainNavigation  from '../components/MainNavigation';

export default {
  title: 'Example/MainNavigation',
  component: MainNavigation,
} as ComponentMeta<typeof MainNavigation>;

const Template: ComponentStory<typeof MainNavigation> = () => <MainNavigation />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
