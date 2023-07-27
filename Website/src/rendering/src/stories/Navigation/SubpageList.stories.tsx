import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SubpageList from '../../components/Navigation/SubpageList';
import { SitecoreItem } from 'src/types/sitecoreItem';

export default {
  title: 'Components/Navigation/SubpageList',
  component: SubpageList,
} as ComponentMeta<typeof SubpageList>;

const Template: ComponentStory<typeof SubpageList> = (args) => <SubpageList {...args} />;

const item1 = {
  name: 'Landing Page Example 1',
  url: '/',
} as unknown as SitecoreItem;

const item2 = {
  name: 'Landing Page Example 2',
  url: '/',
} as unknown as SitecoreItem;

const item3 = {
  name: 'Landing Page Example 3',
  url: '/',
} as unknown as SitecoreItem;

export const Default = Template.bind({});
Default.args = {
  fields: {
    items: [item1, item2, item3],
  },
};

export const ZeroSubItems = Template.bind({});
ZeroSubItems.args = {
  fields: {
    items: [],
  },
};

export const UndefinedSubItems = Template.bind({});
UndefinedSubItems.args = {
  fields: {
    items: undefined,
  },
};
