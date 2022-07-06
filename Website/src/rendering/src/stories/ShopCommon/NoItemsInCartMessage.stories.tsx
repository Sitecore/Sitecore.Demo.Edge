import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NoItemsInCartMessage from '../../components/ShopCommon/NoItemsInCartMessage';

export default {
  title: 'Components/ShopCommon/NoItemsInCartMessage',
  component: NoItemsInCartMessage,
} as ComponentMeta<typeof NoItemsInCartMessage>;

const Template: ComponentStory<typeof NoItemsInCartMessage> = () => <NoItemsInCartMessage />;

export const Default = Template.bind({});
