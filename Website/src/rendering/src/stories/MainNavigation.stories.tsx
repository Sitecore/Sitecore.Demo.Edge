import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainNavigation, { MainNavigationProps } from '../components/Navigation/MainNavigation';

export default {
  title: 'Components/MainNavigation',
  component: MainNavigation,
} as ComponentMeta<typeof MainNavigation>;

const Template: ComponentStory<typeof MainNavigation> = (args) => <MainNavigation {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    data: {
      item: {
        headerLogo: {
          jsonValue: {
            value: {
              src: 'https://demoedge.sitecoresandbox.cloud/api/public/content/f9e7e50f21ce4f718e7967ac61633807?v=fc7a13bd',
            },
          },
          alt: '',
        },
      },
    },
  },
} as MainNavigationProps;
