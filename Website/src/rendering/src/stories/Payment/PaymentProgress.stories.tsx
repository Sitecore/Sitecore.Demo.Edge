import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentProgress from '../../components/Payment/PaymentProgress';

export default {
  title: 'Components/Payment/PaymentProgress',
  component: PaymentProgress,
} as ComponentMeta<typeof PaymentProgress>;

const Template: ComponentStory<typeof PaymentProgress> = (args) => <PaymentProgress {...args} />;

export const Page1 = Template.bind({});
Page1.args = {
  fields: {
    ActiveStep: {
      value: 1,
    },
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
};

export const Page2 = Template.bind({});
Page2.args = {
  fields: {
    ActiveStep: {
      value: 2,
    },
  },
};

export const Page3 = Template.bind({});
Page3.args = {
  fields: {
    ActiveStep: {
      value: 3,
    },
  },
};
