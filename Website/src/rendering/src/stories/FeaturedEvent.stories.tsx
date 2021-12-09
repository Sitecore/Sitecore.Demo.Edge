import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeaturedEvent from '../components/Page Content/FeaturedEvent';

export default {
  title: 'Components/FeaturedEvent',
  component: FeaturedEvent,
} as ComponentMeta<typeof FeaturedEvent>;

const Template: ComponentStory<typeof FeaturedEvent> = () => <FeaturedEvent />;

export const Default = Template.bind({});
Default.args = {};
