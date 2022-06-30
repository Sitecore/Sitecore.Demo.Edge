import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeaderContent, { HeaderContentProps } from '../../components/Navigation/HeaderContent';
import { mockHeaderProps } from '../Pages/PageStoriesCommon';

export default {
  title: 'Components/Navigation/HeaderContent',
  component: HeaderContent,
} as ComponentMeta<typeof HeaderContent>;

const Template: ComponentStory<typeof HeaderContent> = (args: HeaderContentProps) => (
  <HeaderContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...mockHeaderProps,
  rendering: undefined,
};
