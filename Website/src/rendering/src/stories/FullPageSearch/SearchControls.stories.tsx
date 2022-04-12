import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchControls, {
  SearchControlsProps,
} from '../../components/FullPageSearch/SearchControls';
import { DiscoverServiceFactory } from '../../services/DiscoverServiceFactory';

export default {
  title: 'Components/FullPageSearch/SearchControls',
  component: SearchControls,
} as ComponentMeta<typeof SearchControls>;

const Template: ComponentStory<typeof SearchControls> = (args) => <SearchControls {...args} />;

const searchControlsProps = {
  onPageNumberChange: (): void => {
    return null;
  },
  onSortChange: (): void => {
    return null;
  },
  page: 0,
  sortChoices: [
    {
      label: '',
      name: '',
      order: '',
    },
  ],
  sortDirection: '',
  sortType: '',
  totalPages: 0,
};

export const Default = Template.bind({});
Default.args = DiscoverServiceFactory(
  'storybookSearchControls',
  searchControlsProps
) as Partial<SearchControlsProps>;
