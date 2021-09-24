import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionInformation, { Speaker } from '../../components/SessionInformation';

export default {
  title: 'Components/Sessions/SessionInformation',
  component: SessionInformation,
} as ComponentMeta<typeof SessionInformation>;

const Template: ComponentStory<typeof SessionInformation> = (args) => (
  <SessionInformation {...args} />
);

const speaker1 = {
  fields: {
    Name: {
      value: 'Mary Asada',
    },
    Role: {
      value: 'Athlete',
    },
    Picture: {
      value: {
        src: 'https://mint.stylelabs.io/api/public/content/71277d3734f9479fae9b22e58d36e217?v=8f834e76',
      },
    },
    JobTitle: {
      value: 'Manager',
    },
    Company: {
      value: 'Sitecore',
    },
    Location: {
      value: 'Canada',
    },
    Description: {
      value:
        '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.&nbsp;</p><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p><ul><li>Lorem ipsum dolor sit amet</li><li>consetetur sadipscing elitr</li><li>sed diam nonumy eirmod tempor</li><li>invidunt ut labore et dolore</li><li>magna aliquyam erat</li><li>sed diam voluptua</li></ul><p>ad fas dasd asasdf asd fasd fasd fas dfasd f sdfasdfda sd as sdgf sdfg sdfg sdfbghtyurty urty urtyu rtyur tasdasqwqwrt wert wert wert wert sdfg sgd. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p>',
    },
    FacebookProfileLink: {
      value: 'https://facebook.com/asada',
    },
    TwitterProfileLink: {
      value: 'https://twitter.com/asada',
    },
    InstagramProfileLink: {
      value: 'https://instagram.com/asada',
    },
    LinkedinProfileLink: {
      value: 'https://linkedin.com/asada',
    },
  },
} as Speaker;

const speaker2 = {
  fields: {
    Name: {
      value: 'John Jones',
    },
    Role: {
      value: 'Speaker',
    },
    Picture: {
      value: {
        src: 'https://mint.stylelabs.io/api/public/content/71277d3734f9479fae9b22e58d36e217?v=8f834e76',
      },
    },
    JobTitle: {
      value: 'Manager',
    },
    Company: {
      value: 'Sitecore',
    },
    Location: {
      value: 'Canada',
    },
    Description: {
      value:
        '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.&nbsp;</p><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p><ul><li>Lorem ipsum dolor sit amet</li><li>consetetur sadipscing elitr</li><li>sed diam nonumy eirmod tempor</li><li>invidunt ut labore et dolore</li><li>magna aliquyam erat</li><li>sed diam voluptua</li></ul><p>ad fas dasd asasdf asd fasd fasd fas dfasd f sdfasdfda sd as sdgf sdfg sdfg sdfbghtyurty urty urtyu rtyur tasdasqwqwrt wert wert wert wert sdfg sgd. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p>',
    },
    FacebookProfileLink: {
      value: 'https://facebook.com/asada',
    },
    TwitterProfileLink: {
      value: 'https://twitter.com/asada',
    },
    InstagramProfileLink: {
      value: 'https://instagram.com/asada',
    },
    LinkedinProfileLink: {
      value: 'https://linkedin.com/asada',
    },
  },
} as Speaker;

const rooms = [
  { fields: { Name: { value: 'Room 1' } } },
  { fields: { Name: { value: 'Room 2' } } },
];

const timeslots = [
  { fields: { Name: { value: '8 am' } } },
  { fields: { Name: { value: '9 am' } } },
];

const days = [{ fields: { Name: { value: 'Day 1' } } }];

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'SessionInformation',
  },
  fields: {
    Name: { value: '7 Mindset STRATEGIES to raise your game' },
    Description: {
      value:
        '<p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec rutrum congue leo eget malesuada. Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p><p>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla quis lorem ut libero malesuada feugiat. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor accumsan tincidunt. Proin eget tortor risus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>',
    },
    Type: { value: 'Keynote' },
    Image: { value: { src: '/assets/img/shop/man-biker.jpg' } },
    Speakers: [speaker1, speaker2],
    Rooms: rooms,
    Day: days,
    Timeslots: timeslots,
    Premium: { value: true },
  },
};
