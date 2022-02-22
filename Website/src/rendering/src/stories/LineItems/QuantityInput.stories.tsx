import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import QuantityInput from '../../components/LineItems/QuantityInput';

export default {
  title: 'Components/LineItems/QuantityInput',
  component: QuantityInput,
} as ComponentMeta<typeof QuantityInput>;

const Template: ComponentStory<typeof QuantityInput> = (args) => <QuantityInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'QuantityInput',
  },
  rendering: {
    componentName: 'QuantityInput',
    dataSource: '/sitecore',
  },
};
