import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PreviewSearch, { PreviewSearchProps } from '../../components/PreviewSearch/PreviewSearch';
import { DiscoverServiceFactory } from '../../services/DiscoverServiceFactory';

export default {
  title: 'Components/PreviewSearch/PreviewSearch',
  component: PreviewSearch,
} as ComponentMeta<typeof PreviewSearch>;

const Template: ComponentStory<typeof PreviewSearch> = (args) => <PreviewSearch {...args} />;

const previewSearchProps: PreviewSearchProps = {
  loaded: false,
  loading: false,
  products: [],
  keyphrase: '',
  trendingCategories: [],
  categories: [],
  suggestions: [],
  selectedKeyword: '',
  redirectUrl: '',
  inputQuerySelector: '',
  dispatch: () => {
    return null;
  },
};

export const Default = Template.bind({});
Default.args = DiscoverServiceFactory(
  'storybookPreviewSearch',
  previewSearchProps
) as Partial<PreviewSearchProps>;
