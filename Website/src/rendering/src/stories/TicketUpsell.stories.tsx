import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TicketUpsell from '../components/Page Content/TicketUpsell';

export default {
  title: 'Components/TicketUpsell',
  component: TicketUpsell,
} as ComponentMeta<typeof TicketUpsell>;

const Template: ComponentStory<typeof TicketUpsell> = () => <TicketUpsell />;

export const Default = Template.bind({});
Default.args = {};
