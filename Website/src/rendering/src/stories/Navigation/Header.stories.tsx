import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserProvider } from '@auth0/nextjs-auth0';

import Header, { HeaderProps } from '../../components/Navigation/Header';

export default {
  title: 'Components/Navigation/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args: HeaderProps) => (
  <UserProvider>
    <Header {...args} />
  </UserProvider>
);

export const Default = Template.bind({});
Default.args = {};
