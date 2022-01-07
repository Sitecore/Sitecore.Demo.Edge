import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Products from '../../pages/shop/products';
import { UserProvider } from '@auth0/nextjs-auth0';

export default {
  title: 'Pages/Shop Products Listing Page',
} as ComponentMeta<typeof Products>;

const Template: ComponentStory<typeof Products> = () => {
  return (
    <UserProvider>
      <Products />
    </UserProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
