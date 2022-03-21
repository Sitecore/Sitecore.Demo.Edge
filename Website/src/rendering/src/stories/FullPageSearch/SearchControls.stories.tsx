import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchControls from '../../components/FullPageSearch/SearchControls';

export default {
  title: 'Components/FullPageSearch/SearchControls',
  component: SearchControls,
} as ComponentMeta<typeof SearchControls>;

const Template: ComponentStory<typeof SearchControls> = (args) => <SearchControls {...args} />;

export const Default = Template.bind({});
Default.args = {
  onPageNumberChange: () => {
    return null;
  },
  onPerPageChange: () => {
    return null;
  },
  onSearchChange: () => {
    return null;
  },
  onSortChange: () => {
    return null;
  },
  page: 1,
  productsPage: undefined,
  sortChoices: [
    {
      label: 'Featured ASC',
      name: 'featured',
      order: 'asc',
    },
  ],
  sortDirection: undefined,
  sortType: undefined,
  totalPages: 1,
};
