import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Item } from '@sitecore-jss/sitecore-jss-nextjs';
import SubpageList from '../../components/Navigation/SubpageList';

export default {
  title: 'Components/Navigation/SubpageList',
  component: SubpageList,
} as ComponentMeta<typeof SubpageList>;

const Template: ComponentStory<typeof SubpageList> = (args) => <SubpageList {...args} />;

const item1 = {
  name: 'Landing Page Example 1',
  url: '/',
} as unknown as Item;

const item2 = {
  name: 'Landing Page Example 2',
  url: '/',
} as unknown as Item;

const item3 = {
  name: 'Landing Page Example 3',
  url: '/',
} as unknown as Item;

export const Default = Template.bind({});
Default.args = {
  fields: {
    items: [item1, item2, item3],
  },
};
