import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CountdownSection from '../components/Page Content/CountdownSection';

export default {
  title: 'Components/CountdownSection',
  component: CountdownSection,
} as ComponentMeta<typeof CountdownSection>;

const Template: ComponentStory<typeof CountdownSection> = () => <CountdownSection />;

export const Default = Template.bind({});
Default.args = {};
