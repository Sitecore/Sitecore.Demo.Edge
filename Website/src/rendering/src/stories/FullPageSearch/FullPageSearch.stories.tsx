import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FullPageSearch from '../../components/FullPageSearch/FullPageSearch';
import { mockDiscoverData } from '../mock-discover-data';

export default {
  title: 'Components/FullPageSearch/FullPageSearch',
  component: FullPageSearch,
} as ComponentMeta<typeof FullPageSearch>;

const Template: ComponentStory<typeof FullPageSearch> = (args) => <FullPageSearch {...args} />;

export const Default = Template.bind({});
Default.args = mockDiscoverData.fullPageSearchProps;

export const CategoryNotFound = Template.bind({});
CategoryNotFound.args = {
  ...mockDiscoverData.fullPageSearchProps,
  rfkId: 'rfkid_10',
};
