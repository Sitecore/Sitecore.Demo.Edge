import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FullImageCTASection from '../../components/Page Content/FullImageCTASection';

export default {
  title: 'Components/Page Content/FullImageCTASection',
  component: FullImageCTASection,
} as ComponentMeta<typeof FullImageCTASection>;

const Template: ComponentStory<typeof FullImageCTASection> = () => <FullImageCTASection />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'FullImageCTASection',
  },
};
