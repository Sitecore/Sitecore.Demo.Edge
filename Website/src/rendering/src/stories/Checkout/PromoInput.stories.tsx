import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PromoInput from '../../components/Checkout/PromoInput';

export default {
  title: 'Components/Checkout/PromoInput',
  component: PromoInput,
} as ComponentMeta<typeof PromoInput>;

const Template: ComponentStory<typeof PromoInput> = (args) => <PromoInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  order: {},
};
