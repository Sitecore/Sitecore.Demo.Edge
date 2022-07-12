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

export const WithoutPlaceholder = Template.bind({});
WithoutPlaceholder.args = {
  ...mockDiscoverData.searchInputProps,
  placeholder: '',
};
