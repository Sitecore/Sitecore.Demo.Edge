import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FullPageSearch from '../../components/FullPageSearch/FullPageSearch';
import { DiscoverServiceFactory } from '../../services/DiscoverServiceFactory';
import { SearchResultsWidgetProps } from '@sitecore-discover/ui';

export default {
  title: 'Components/FullPageSearch/FullPageSearch',
  component: FullPageSearch,
} as ComponentMeta<typeof FullPageSearch>;

const Template: ComponentStory<typeof FullPageSearch> = (args) => <FullPageSearch {...args} />;

const fullPageSearchProps = {
  error: '',
  loaded: false,
  loading: false,
  page: 0,
  keyphrase: '',
  productsPerPage: 0,
  totalPages: 0,
  totalItems: 0,
  sortType: '',
  sortDirection: '',
  sortChoices: [] as unknown[],
  products: [] as unknown[],
  facets: [] as unknown[],
  onSearchChange: (): unknown => {
    return null;
  },
  dispatch: (): unknown => {
    return null;
  },
};

export const Default = Template.bind({});
Default.args = DiscoverServiceFactory(
  'storybookFullPageSearch',
  fullPageSearchProps
) as Partial<SearchResultsWidgetProps>;
