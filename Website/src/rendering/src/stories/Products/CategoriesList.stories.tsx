import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CategoriesList from '../../components/Products/CategoriesList';
import { initialize as initializeDiscover } from '../../services/DiscoverService';
import { mockDiscoverData } from '../mock-discover-data';

export default {
  title: 'Components/Products/CategoriesList',
  component: CategoriesList,
} as ComponentMeta<typeof CategoriesList>;

const Template: ComponentStory<typeof CategoriesList> = (args) => <CategoriesList {...args} />;

initializeDiscover({
  isStorybook: true,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Welcome to PLAY! SHOP',
  subtitle: 'Shop by category:',
  theme: 'blue',
  trendingCategoriesProps: mockDiscoverData.trendingCategoriesProps,
};
