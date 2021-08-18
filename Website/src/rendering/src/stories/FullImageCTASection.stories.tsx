import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FullImageCTASection from '../components/FullImageCTASection';

export default {
  title: 'Components/FullImageCTASection',
  component: FullImageCTASection,
} as ComponentMeta<typeof FullImageCTASection>;

const Template: ComponentStory<typeof FullImageCTASection> = (args) => <FullImageCTASection {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'FullImageCTASection',
  },
};
