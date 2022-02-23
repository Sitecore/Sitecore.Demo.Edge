import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SpeakerList, { SpeakerListProps } from '../../components/Speakers/SpeakerList';
import { Speaker } from 'src/types/speaker';

export default {
  title: 'Components/Speakers/SpeakerList',
  component: SpeakerList,
} as ComponentMeta<typeof SpeakerList>;

const Template: ComponentStory<typeof SpeakerList> = (args: SpeakerListProps) => (
  <SpeakerList {...args} />
);

const speaker1 = {
  fields: {
    Name: {
      value: 'Mary Asada',
    },
    jobTitle: {
      value: 'Athlete',
    },
    Picture: {
      value: {
        src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/3fcb3ce4bc0d4d778da7a3dc66fa1cb2?v=e3d5a7cb',
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
    Featured: {
      value: false,
    },
  },
  url: '/speaker/Speaker-Name',
} as Speaker;

const speaker2 = {
  fields: {
    Name: {
      value: 'John Jones',
    },
    jobTitle: {
      value: 'Speaker',
    },
    Picture: {
      value: {
        src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/0fd271e931024667b36c3e21dd3256b1?v=82e3ff67',
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
    Featured: {
      value: true,
    },
  },
  url: '/speaker/Speaker-Name',
} as Speaker;

export const Default = Template.bind({});
Default.args = {
  speakers: [speaker1, speaker2],
};
