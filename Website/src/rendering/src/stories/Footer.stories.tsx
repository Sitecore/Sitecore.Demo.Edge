import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Footer from '../components/Footer';

export default {
  title: 'Components/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => {
  return (
    <footer>
      <Footer />
    </footer>
  );
};

export const Default = Template.bind({});
Default.args = {};
