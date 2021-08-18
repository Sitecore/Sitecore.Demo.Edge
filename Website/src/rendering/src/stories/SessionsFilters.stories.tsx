import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionsFilters from '../components/SessionsFilters';

export default {
  title: 'Components/SessionsFilters',
  component: SessionsFilters,
} as ComponentMeta<typeof SessionsFilters>;

const Template: ComponentStory<typeof SessionsFilters> = (args) => <SessionsFilters {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'SessionsFilters',
  },
};
