import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NewsGrid from '../components/NewsGrid';

export default {
  title: 'Example/NewsGrid',
  component: NewsGrid,
} as ComponentMeta<typeof NewsGrid>;

const Template: ComponentStory<typeof NewsGrid> = () => {
  return (
    <div className="container">
      <NewsGrid />;
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {};
