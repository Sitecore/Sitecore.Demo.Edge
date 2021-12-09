import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RequestInfoForm from '../components/Forms/RequestInfoForm';

export default {
  title: 'Components/RequestInfoForm',
  component: RequestInfoForm,
} as ComponentMeta<typeof RequestInfoForm>;

const Template: ComponentStory<typeof RequestInfoForm> = () => <RequestInfoForm />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'RequestInfoForm',
  },
};
