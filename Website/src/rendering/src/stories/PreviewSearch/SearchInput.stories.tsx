import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchInput from '../../components/PreviewSearch/SearchInput';
import { mockDiscoverData } from '../mock-discover-data';

export default {
  title: 'Components/PreviewSearch/SearchInput',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = mockDiscoverData.searchInputProps;
Default.decorators = [
  (Story) => (
    <div className="shop-navigation">
      <div className="shop-navigation-content">
        <div className="shop-search-input-container">
          <Story />
        </div>
      </div>
    </div>
  ),
];

export const WithoutPlaceholder = Template.bind({});
WithoutPlaceholder.args = {
  ...mockDiscoverData.searchInputProps,
  placeholder: '',
};
WithoutPlaceholder.decorators = [
  (Story) => (
    <div className="shop-navigation">
      <div className="shop-navigation-content">
        <div className="shop-search-input-container">
          <Story />
        </div>
      </div>
    </div>
  ),
];
