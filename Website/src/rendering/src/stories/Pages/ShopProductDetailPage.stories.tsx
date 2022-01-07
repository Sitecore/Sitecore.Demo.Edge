import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Product from '../../pages/shop/product';
import { UserProvider } from '@auth0/nextjs-auth0';

export default {
  title: 'Pages/Shop Product Detail Page',
} as ComponentMeta<typeof Product>;

const Template: ComponentStory<typeof Product> = () => {
  return (
    <UserProvider>
      <Product />
    </UserProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
