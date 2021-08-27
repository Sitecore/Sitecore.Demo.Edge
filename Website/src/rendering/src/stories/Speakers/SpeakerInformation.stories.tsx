import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SpeakerInformation, { SpeakerInformationProps } from '../../components/SpeakerInformation';

export default {
  title: 'Components/Speakers/SpeakerInformation',
  component: SpeakerInformation,
} as ComponentMeta<typeof SpeakerInformation>;

const Template: ComponentStory<typeof SpeakerInformation> = (args: SpeakerInformationProps) => (
  <SpeakerInformation {...args} />
);

const fieldsWithoutSocialLinks = {
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
  Position: {
    value: 'Manager',
  },
  Company: {
    value: 'Sitecore',
  },
  Country: {
    value: 'Canada',
  },
  Description: {
    value:
      '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.&nbsp;</p><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p><ul><li>Lorem ipsum dolor sit amet</li><li>consetetur sadipscing elitr</li><li>sed diam nonumy eirmod tempor</li><li>invidunt ut labore et dolore</li><li>magna aliquyam erat</li><li>sed diam voluptua</li></ul><p>ad fas dasd asasdf asd fasd fasd fas dfasd f sdfasdfda sd as sdgf sdfg sdfg sdfbghtyurty urty urtyu rtyur tasdasqwqwrt wert wert wert wert sdfg sgd. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p>',
  },
};

const fieldsWithSocialLinks = {
  ...fieldsWithoutSocialLinks,
  ...{
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
};

export const WithoutSocialLinks = Template.bind({});
WithoutSocialLinks.args = {
  fields: fieldsWithoutSocialLinks,
};

export const WithSocialLinks = Template.bind({});
WithSocialLinks.args = {
  fields: fieldsWithSocialLinks,
};
