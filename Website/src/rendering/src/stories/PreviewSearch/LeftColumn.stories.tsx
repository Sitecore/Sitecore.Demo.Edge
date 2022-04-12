import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LeftColumn, { LeftColumnProps } from '../../components/PreviewSearch/LeftColumn';
import { DiscoverServiceFactory } from '../../services/DiscoverServiceFactory';
import { Category } from '../../models/discover/Category';

export default {
  title: 'Components/PreviewSearch/LeftColumn',
  component: LeftColumn,
} as ComponentMeta<typeof LeftColumn>;

const Template: ComponentStory<typeof LeftColumn> = (args) => <LeftColumn {...args} />;

const leftColumnProps = {
  categories: [] as Category[],
  trendingCategories: [] as Category[],
  suggestions: [] as unknown[],
  loading: false,
  loaded: false,
  onCategoryChanged: (): void => {
    return null;
  },
  onTrendingCategoryChanged: (): void => {
    return null;
  },
  onSuggestionChanged: (): void => {
    return null;
  },
  redirectUrl: '',
};

export const Default = Template.bind({});
Default.args = DiscoverServiceFactory(
  'storybookLeftColumn',
  leftColumnProps
) as Partial<LeftColumnProps>;
