import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Shop from '../../pages/shop/index';
import { UserProvider } from '@auth0/nextjs-auth0';

export default {
  title: 'Pages/Shop Landing Page',
} as ComponentMeta<typeof Shop>;

const Template: ComponentStory<typeof Shop> = () => {
  return (
    <UserProvider>
      <Shop />
    </UserProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
