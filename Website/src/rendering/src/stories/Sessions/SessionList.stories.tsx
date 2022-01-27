import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionList, { SessionListProps } from '../../components/Sessions/SessionList';
import { SESSIONS } from '../mock-sessions';

export default {
  title: 'Components/Sessions/SessionList',
  component: SessionList,
} as ComponentMeta<typeof SessionList>;

const Template: ComponentStory<typeof SessionList> = (args: SessionListProps) => (
  <SessionList {...args} />
);

export const WithoutSpeakers = Template.bind({});
WithoutSpeakers.args = {
  sessions: SESSIONS,
  showSpeakers: false,
};

export const WithSpeakers = Template.bind({});
WithSpeakers.args = {
  sessions: SESSIONS,
  showSpeakers: true,
};
