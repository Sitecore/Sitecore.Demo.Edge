import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AgendaGrid from '../components/AgendaGrid';

export default {
  title: 'Components/AgendaGrid',
  component: AgendaGrid,
} as ComponentMeta<typeof AgendaGrid>;

const Template: ComponentStory<typeof AgendaGrid> = (args) => <AgendaGrid {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'AgendaGrid',
  },
};
