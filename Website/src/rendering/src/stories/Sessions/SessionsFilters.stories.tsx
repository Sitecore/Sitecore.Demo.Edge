import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionsFilters from '../../components/Sessions/SessionsFilters';

export default {
  title: 'Components/Sessions/SessionsFilters',
  component: SessionsFilters,
} as ComponentMeta<typeof SessionsFilters>;

const Template: ComponentStory<typeof SessionsFilters> = () => <SessionsFilters />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'SessionsFilters',
  },
};
