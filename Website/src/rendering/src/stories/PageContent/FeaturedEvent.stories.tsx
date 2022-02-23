import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeaturedEvent from '../../components/PageContent/FeaturedEvent';

export default {
  title: 'Components/PageContent/FeaturedEvent',
  component: FeaturedEvent,
} as ComponentMeta<typeof FeaturedEvent>;

const Template: ComponentStory<typeof FeaturedEvent> = () => <FeaturedEvent />;

export const Default = Template.bind({});
Default.args = {};
