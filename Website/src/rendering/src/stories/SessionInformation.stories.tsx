import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionInformation from '../components/SessionInformation';

export default {
  title: 'Components/SessionInformation',
  component: SessionInformation,
} as ComponentMeta<typeof SessionInformation>;

const Template: ComponentStory<typeof SessionInformation> = (args) => <SessionInformation {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'SessionInformation',
  },
};
