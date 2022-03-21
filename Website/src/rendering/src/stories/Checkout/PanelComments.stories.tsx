import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PanelComments from '../../components/Checkout/PanelComments';
import { MockStore } from '../mock-store';

export default {
  title: 'Components/Checkout/PanelComments',
  component: PanelComments,
} as ComponentMeta<typeof PanelComments>;

const Template: ComponentStory<typeof PanelComments> = (args) => <PanelComments {...args} />;

export const WithExistingComment = Template.bind({});
WithExistingComment.args = {};

const mockstate = {
  initialized: true,
  order: {
    ID: 'mock-id',
    Comments: 'Is it possible to deliver the product in the evening after 6PM CST?',
  },
};

WithExistingComment.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockstate }}>
      <Story />
    </MockStore>
  ),
];

export const WithoutExistingComment = Template.bind({});
WithoutExistingComment.args = {};

const mockstate2 = {
  initialized: true,
  order: {
    ID: 'mock-id',
  },
};

WithoutExistingComment.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockstate2 }}>
      <Story />
    </MockStore>
  ),
];
