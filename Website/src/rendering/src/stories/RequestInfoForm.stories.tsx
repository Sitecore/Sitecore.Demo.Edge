import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RequestInfoForm from '../components/RequestInfoForm';

export default {
  title: 'Components/RequestInfoForm',
  component: RequestInfoForm,
} as ComponentMeta<typeof RequestInfoForm>;

const Template: ComponentStory<typeof RequestInfoForm> = (args) => <RequestInfoForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'RequestInfoForm',
  },
};
