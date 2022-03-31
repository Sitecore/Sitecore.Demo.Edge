import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CategoriesList from '../../components/Products/CategoriesList';

export default {
  title: 'Components/Products/CategoriesList',
  component: CategoriesList,
} as ComponentMeta<typeof CategoriesList>;

const Template: ComponentStory<typeof CategoriesList> = (args) => <CategoriesList {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Welcome to PLAY! SHOP',
  subtitle: 'Shop by category:',
  theme: 'blue',
  inStorybook: true,
  categories: [
    {
      url: '/shop/category/activities/hiking/equipment',
      text: 'equipment',
      in_content: 'product',
      id: 'suggestion_idZXF1aXBtZW50',
    },
    {
      url: '/shop/category/activities/cycling/equipment/maintenance',
      text: 'maintenance',
      in_content: 'product',
      id: 'suggestion_idbWFpbnRlbmFuY2U=',
    },
    {
      url: '/shop/category/activities/yoga/accessories',
      text: 'accessories',
      in_content: 'product',
      id: 'suggestion_idYWNjZXNzb3JpZXM=',
    },
  ],
};
