import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionList from '../components/SessionList';

export default {
  title: 'Components/SessionList',
  component: SessionList,
} as ComponentMeta<typeof SessionList>;

const Template: ComponentStory<typeof SessionList> = () => <SessionList />;

export const Default = Template.bind({});
Default.args = {};
