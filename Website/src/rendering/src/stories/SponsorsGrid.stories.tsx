import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SponsorsGrid from '../components/SponsorsGrid';

export default {
  title: 'Example/SponsorsGrid',
  component: SponsorsGrid,
} as ComponentMeta<typeof SponsorsGrid>;

const Template: ComponentStory<typeof SponsorsGrid> = () => <SponsorsGrid />;

export const Default = Template.bind({});
Default.args = {};
