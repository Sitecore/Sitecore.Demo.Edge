import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GalleryGrid from '../components/Page Content/GalleryGrid';

export default {
  title: 'Components/GalleryGrid',
  component: GalleryGrid,
} as ComponentMeta<typeof GalleryGrid>;

const Template: ComponentStory<typeof GalleryGrid> = () => <GalleryGrid />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'GalleryGrid',
  },
};
