import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PreCheckout from '../../components/Checkout/PreCheckout';

export default {
  title: 'Components/Checkout/PreCheckout',
  component: PreCheckout,
} as ComponentMeta<typeof PreCheckout>;

const Template: ComponentStory<typeof PreCheckout> = (args) => <PreCheckout {...args} />;

export const Default = Template.bind({});
Default.args = {};
