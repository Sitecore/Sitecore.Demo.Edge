import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TicketGrid from '../../components/PageContent/TicketGrid';

export default {
  title: 'Components/PageContent/TicketGrid',
  component: TicketGrid,
} as ComponentMeta<typeof TicketGrid>;

const Template: ComponentStory<typeof TicketGrid> = () => <TicketGrid />;

export const Default = Template.bind({});
Default.args = {};
