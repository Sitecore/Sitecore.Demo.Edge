import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ThankYouSection from '../../components/Checkout/ThankYouSection';

export default {
  title: 'Components/Checkout/ThankYouSection',
  component: ThankYouSection,
} as ComponentMeta<typeof ThankYouSection>;

const Template: ComponentStory<typeof ThankYouSection> = () => <ThankYouSection />;

export const Default = Template.bind({});
Default.args = {};
