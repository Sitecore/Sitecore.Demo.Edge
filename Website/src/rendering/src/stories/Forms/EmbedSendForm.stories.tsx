import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import EmbedSendForm from '../../components/Forms/EmbedSendForm';
import {
  LayoutServiceData,
  LayoutServicePageState,
  SitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { mockLayoutData } from '../../../.storybook/preview';
import { mockComponentFactory } from '../Pages/PageStoriesCommon';

export default {
  title: 'Components/Forms/EmbedSendForm',
  component: EmbedSendForm,
} as ComponentMeta<typeof EmbedSendForm>;

const Template: ComponentStory<typeof EmbedSendForm> = (args) => <EmbedSendForm {...args} />;

const editMockLayoutData = {
  ...mockLayoutData,
  sitecore: {
    context: {
      ...mockLayoutData.sitecore.context,
      pageEditing: true,
      pageState: LayoutServicePageState.Edit,
    },
  },
} as unknown as LayoutServiceData;

export const EditMode = Template.bind({});
EditMode.args = {
  fields: {
    sendFormId: {
      value: 'Some ID',
    },
  },
};
EditMode.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={mockComponentFactory} layoutData={editMockLayoutData}>
      <Story />
    </SitecoreContext>
  ),
];

const previewMockLayoutData = {
  ...mockLayoutData,
  sitecore: {
    context: {
      ...mockLayoutData.sitecore.context,
      pageEditing: false,
      pageState: LayoutServicePageState.Preview,
    },
  },
} as unknown as LayoutServiceData;

export const PreviewMode = Template.bind({});
PreviewMode.args = {
  fields: {
    sendFormId: {
      value: 'Some ID',
    },
  },
};
PreviewMode.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={mockComponentFactory} layoutData={previewMockLayoutData}>
      <Story />
    </SitecoreContext>
  ),
];
