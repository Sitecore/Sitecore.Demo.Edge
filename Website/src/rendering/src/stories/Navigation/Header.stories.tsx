import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header, { HeaderProps } from '../../components/Navigation/Header';

export default {
  title: 'Components/Navigation/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args: HeaderProps) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};
