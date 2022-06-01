import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CategoryBreadcrumb from '../../components/Navigation/CategoryBreadcrumb';
import { categoriesData } from '../../temp/categoriesData';

export default {
  title: 'Components/Navigation/CategoryBreadcrumb',
  component: CategoryBreadcrumb,
} as ComponentMeta<typeof CategoryBreadcrumb>;

const Template: ComponentStory<typeof CategoryBreadcrumb> = (args) => (
  <div className="bg-blue">
    <CategoryBreadcrumb {...args} />
  </div>
);

export const NoCategory = Template.bind({});
NoCategory.args = {};

export const RootCategory = Template.bind({});
RootCategory.args = {
  category: categoriesData[0],
};

export const FirstLevelCategory = Template.bind({});
FirstLevelCategory.args = {
  category: categoriesData[1],
};

export const SecondLevelCategory = Template.bind({});
SecondLevelCategory.args = {
  category: categoriesData[2],
};
