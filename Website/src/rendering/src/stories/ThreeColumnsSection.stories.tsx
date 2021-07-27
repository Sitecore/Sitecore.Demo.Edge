import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ThreeColumnsSection from '../components/ThreeColumnsSection';

export default {
  title: 'Example/ThreeColumnsSection',
  component: ThreeColumnsSection,
} as ComponentMeta<typeof ThreeColumnsSection>;

const Template: ComponentStory<typeof ThreeColumnsSection> = () => <ThreeColumnsSection />;

export const Default = Template.bind({});
Default.args = {};
