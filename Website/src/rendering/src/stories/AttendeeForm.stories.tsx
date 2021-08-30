import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AttendeeForm from '../components/AttendeeForm';

export default {
  title: 'Components/AttendeeForm',
  component: AttendeeForm,
} as ComponentMeta<typeof AttendeeForm>;

const Template: ComponentStory<typeof AttendeeForm> = () => <AttendeeForm />;

export const Default = Template.bind({});
Default.args = {};
