import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentProgress from '../components/PaymentProgress';

export default {
  title: 'Components/PaymentProgress',
  component: PaymentProgress,
} as ComponentMeta<typeof PaymentProgress>;

const Template: ComponentStory<typeof PaymentProgress> = (args) => <PaymentProgress {...args} />;

export const Page1 = Template.bind({});
Page1.args = {
  fields: {
    Title: {
      value: '',
    },
    ActiveStep: {
      value: 1,
    },
  },
};

export const Page2 = Template.bind({});
Page2.args = {
  fields: {
    Title: {
      value: '',
    },
    ActiveStep: {
      value: 2,
    },
  },
};

export const Page3 = Template.bind({});
Page3.args = {
  fields: {
    Title: {
      value: '',
    },
    ActiveStep: {
      value: 3,
    },
  },
};
