import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MyAccount from '../../components/Account/MyAccount';

export default {
  title: 'Components/Account/MyAccount',
  component: MyAccount,
} as ComponentMeta<typeof MyAccount>;

const Template: ComponentStory<typeof MyAccount> = (args) => <MyAccount {...args} />;

export const Default = Template.bind({});
// Default.args = {
//   params: {
//     name: 'MyAccount',
//   },
//   rendering: {
//     componentName: 'MyAccount',
//     dataSource: '/sitecore',
//   },
// };
