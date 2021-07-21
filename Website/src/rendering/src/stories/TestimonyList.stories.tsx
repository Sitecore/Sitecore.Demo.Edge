import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TestimonyList from '../components/TestimonyList';

export default {
  title: 'Example/TestimonyList',
  component: TestimonyList,
} as ComponentMeta<typeof TestimonyList>;

const Template: ComponentStory<typeof TestimonyList> = () => <TestimonyList />;

export const Default = Template.bind({});
Default.args = {};
