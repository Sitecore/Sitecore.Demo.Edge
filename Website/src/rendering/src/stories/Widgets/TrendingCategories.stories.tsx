import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TrendingCategories from '../../components/Widgets/TrendingCategories';
import { mockDiscoverData } from '../mock-discover-data';

export default {
  title: 'Components/Widgets/TrendingCategories',
  component: TrendingCategories,
} as ComponentMeta<typeof TrendingCategories>;

const Template: ComponentStory<typeof TrendingCategories> = (args) => (
  <TrendingCategories {...args} />
);

export const Default = Template.bind({});
Default.args = mockDiscoverData.trendingCategoriesProps;
