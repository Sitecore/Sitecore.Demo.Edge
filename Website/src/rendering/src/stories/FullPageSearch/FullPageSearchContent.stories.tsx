import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FullPageSearchContent from '../../components/FullPageSearch/FullPageSearchContent';
import { mockDiscoverData } from '../mock-discover-data';
import { getCategoryByUrlPath } from '../../helpers/CategoriesDataHelper';

export default {
  title: 'Components/FullPageSearch/FullPageSearchContent',
  component: FullPageSearchContent,
} as ComponentMeta<typeof FullPageSearchContent>;

const Template: ComponentStory<typeof FullPageSearchContent> = (args) => (
  <FullPageSearchContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...mockDiscoverData.fullPageSearchProps,
  category: getCategoryByUrlPath('/shop/categories/PSA0/activities'),
};

export const CategoryListingPageFound = Template.bind({});
CategoryListingPageFound.args = {
  ...mockDiscoverData.fullPageSearchProps,
  rfkId: 'rfkid_10',
  category: getCategoryByUrlPath('/shop/categories/PSA0/activities'),
};

export const CategoryListingPageNotFound = Template.bind({});
CategoryListingPageNotFound.args = {
  ...mockDiscoverData.fullPageSearchProps,
  rfkId: 'rfkid_10',
  category: getCategoryByUrlPath(''),
};
