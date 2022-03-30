import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ThankYouSection from '../../components/Checkout/ThankYouSection';

export default {
  title: 'Components/Checkout/ThankYouSection',
  component: ThankYouSection,
} as ComponentMeta<typeof ThankYouSection>;

const Template: ComponentStory<typeof ThankYouSection> = (args) => <ThankYouSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'ThankYouSection',
  },
  rendering: {
    componentName: 'ThankYouSection',
    dataSource: '/sitecore',
  },
};
