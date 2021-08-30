import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AttendeeRegistrationForm from '../components/AttendeeRegistrationForm';

export default {
  title: 'Components/AttendeeRegistrationForm',
  component: AttendeeRegistrationForm,
} as ComponentMeta<typeof AttendeeRegistrationForm>;

const Template: ComponentStory<typeof AttendeeRegistrationForm> = () => (
  <AttendeeRegistrationForm />
);

export const Default = Template.bind({});
Default.args = {};
