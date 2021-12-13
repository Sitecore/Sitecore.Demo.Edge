import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NewsDetail from '../../components/News/NewsDetail';

export default {
  title: 'Components/News/NewsDetail',
  component: NewsDetail,
} as ComponentMeta<typeof NewsDetail>;

const Template: ComponentStory<typeof NewsDetail> = (args) => <NewsDetail {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    Title: {
      value: 'PLAY! Summit Goes Live',
    },
    Excerpt: {
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan posuere orci, placerat tristique quam vulputate non. Aliquam erat volutpat. Vestibulum ante ipsum primis in orci luctus et posuere cubilia curae; Sed mollis tincidunt magna eu blandit.',
    },
    PublishDate: {
      value: '2021-07-29T06:00:00Z',
    },
    Content: {
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan posuere orci, placerat tristique quam vulputate non. Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed mollis tincidunt magna eu blandit. Praesent at urna in massa tempus varius a eu diam. Etiam at porta nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed ultricies sed purus a interdum. Nullam ut tempus tellus. Pellentesque venenatis, nisi vitae iaculis auctor, tellus quam dignissim lorem, sit amet aliquet enim nulla vitae neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Fusce non mauris interdum, cursus nibh a, facilisis ex. Ut in placerat orci, ut pretium quam. Donec id odio ac tellus lacinia ullamcorper sed quis purus. Sed consectetur molestie congue. Pellentesque eu nisl vitae est hendrerit cursus vel a mauris. Etiam feugiat ultrices lacus ut vehicula. Donec diam erat, efficitur nec orci at, volutpat mattis justo. Fusce egestas non tortor nec interdum. Fusce nec augue hendrerit, facilisis lorem eu, molestie libero. Donec eget sem egestas orci ullamcorper molestie. Sed felis turpis, interdum et est vel, eleifend tincidunt magna. Nulla vel nisl et odio lacinia congue. Curabitur suscipit cursus tellus, vitae pulvinar ex imperdiet non. In pulvinar tellus quam, et gravida felis mattis id. Integer congue ligula ac nunc vulputate viverra nec et lectus.',
    },
    Image: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
  },
};
