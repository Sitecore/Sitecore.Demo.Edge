import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PreviewSearch from '../../components/PreviewSearch/PreviewSearch';
import { DiscoverServiceFactory } from '../../services/DiscoverServiceFactory';
import { PreviewSearchWidgetProps } from '@sitecore-discover/ui';

export default {
  title: 'Components/PreviewSearch/PreviewSearch',
  component: PreviewSearch,
} as ComponentMeta<typeof PreviewSearch>;

const Template: ComponentStory<typeof PreviewSearch> = (args) => <PreviewSearch {...args} />;

const previewSearchProps = {
  rfkId: '',
  loaded: false,
  loading: false,
  products: [''],
  keyphrase: '',
  trendingCategories: [] as unknown[],
  categories: [] as unknown[],
  suggestions: [] as unknown[],
  redirectUrl: '',
  dispatch: (): Promise<void> => {
    return null;
  },
  lockCategories: false,
  lockSuggestions: false,
  category: '',
  suggestion: '',
  trendingCategory: '',
  selectedKeyword: '',
  available: false,
  onSuggestionChange: (): unknown => {
    return null;
  },
  onTrendingCategoryChange: (): unknown => {
    return null;
  },
  onKeyphraseChange: (): unknown => {
    return null;
  },
  onCategoryChange: (): unknown => {
    return null;
  },
};

export const Default = Template.bind({});
Default.args = DiscoverServiceFactory(
  'storybookPreviewSearch',
  previewSearchProps
) as Partial<PreviewSearchWidgetProps>;
