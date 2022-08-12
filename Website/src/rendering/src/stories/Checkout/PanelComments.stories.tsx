import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PanelComments from '../../components/Checkout/PanelComments';
import { MockStore } from '../mock-store';

export default {
  title: 'Components/Checkout/PanelComments',
  component: PanelComments,
} as ComponentMeta<typeof PanelComments>;

const Template: ComponentStory<typeof PanelComments> = () => (
  <section className="checkout-details shop-container">
    <PanelComments />
  </section>
);

export const WithExistingComment = Template.bind({});
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

export const WithLongComment = Template.bind({});
const mockstate3 = {
  initialized: true,
  order: {
    ID: 'mock-id',
    Comments:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
  },
};

WithLongComment.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockstate3 }}>
      <Story />
    </MockStore>
  ),
];
