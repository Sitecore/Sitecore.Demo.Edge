import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RegistrationGrid from '../components/Page Content/RegistrationGrid';

export default {
  title: 'Components/RegistrationGrid',
  component: RegistrationGrid,
} as ComponentMeta<typeof RegistrationGrid>;

const Template: ComponentStory<typeof RegistrationGrid> = () => <RegistrationGrid />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'RegistrationGrid',
  },
};
