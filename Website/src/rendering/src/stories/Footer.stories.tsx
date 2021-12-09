import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Footer, { FooterProps } from '../components/Navigation/Footer';

export default {
  title: 'Components/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => {
  return (
    <footer>
      <Footer {...args} />
    </footer>
  );
};

export const Default = Template.bind({});
Default.args = {
  fields: {
    data: {
      item: {
        footerLogo: {
          jsonValue: {
            value: {
              src: 'https://demoedge.sitecoresandbox.cloud/api/public/content/d86cdc4b1d1d478b8d1adc22f22cf8d5?v=b5a82bdd',
            },
          },
          alt: '',
        },
      },
    },
  },
} as FooterProps;
