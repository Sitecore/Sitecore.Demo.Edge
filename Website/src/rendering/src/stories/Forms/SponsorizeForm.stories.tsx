import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SponsorizeForm from '../../components/Forms/SponsorizeForm';

export default {
  title: 'Components/Forms/SponsorizeForm',
  component: SponsorizeForm,
} as ComponentMeta<typeof SponsorizeForm>;

const Template: ComponentStory<typeof SponsorizeForm> = () => <SponsorizeForm />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'SponsorizeForm',
  },
};
