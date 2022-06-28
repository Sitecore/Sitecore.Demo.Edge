import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import UserProfileContent from '../../components/Account/UserProfileContent';

export default {
  title: 'Components/Account/UserProfileContent',
  component: UserProfileContent,
} as ComponentMeta<typeof UserProfileContent>;

const Template: ComponentStory<typeof UserProfileContent> = (args) => (
  <UserProfileContent {...args} />
);

export const NoUser = Template.bind({});
NoUser.args = {};

export const Default = Template.bind({});
Default.args = {
  user: {
    FirstName: 'John',
    LastName: 'Smith',
  },
};
