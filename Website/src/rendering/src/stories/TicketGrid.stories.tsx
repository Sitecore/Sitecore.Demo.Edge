import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TicketGrid  from '../components/TicketGrid';

export default {
  title: 'Example/TicketGrid',
  component: TicketGrid,
} as ComponentMeta<typeof TicketGrid>;

const Template: ComponentStory<typeof TicketGrid> = () => <TicketGrid />;

export const Default = Template.bind({});
Default.args = {};
