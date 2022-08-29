import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeaderContent from '../../components/Navigation/HeaderContent';
import HeaderCdpMessageBar from '../../components/HeaderCdpMessageBar';
import SpeakerInformationPageHero, {
  SpeakerInformationPageHeroProps,
} from '../../components/Speakers/SpeakerInformationPageHero';
import SpeakerInformation, {
  SpeakerInformationProps,
} from '../../components/Speakers/SpeakerInformation';
import Footer from '../../components/Navigation/Footer';
import { SESSIONS } from '../mock-sessions';
import { mockComponentFactory, mockFooterProps, mockHeaderProps } from './PageStoriesCommon';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { mockLayoutData } from '../../../.storybook/preview';

export default {
  title: 'Pages/Speaker Information Page',
} as ComponentMeta<typeof SpeakerInformationPageHero>;

const speakerInformationPageHeroProps = {
  fields: {
    Name: {
      value: 'Alex Mena',
    },
    Featured: {
      value: true,
    },
    Picture: {
      value: {
        src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/8f466142f88c4d5c87e29461eddc222f?v=7a63a542',
        height: 1100,
        width: 1100,
      },
    },
    JobTitle: {
      value: 'International Sales Director',
    },
    Company: {
      value: 'Solstice',
    },
    Location: {
      value: 'Paris, France',
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
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
} as unknown as SpeakerInformationPageHeroProps;

const speakerInformationProps = {
  fields: {
    data: {
      contextItem: {
        description: {
          value:
            '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.&nbsp;</p><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p><ul><li>Lorem ipsum dolor sit amet</li><li>consetetur sadipscing elitr</li><li>sed diam nonumy eirmod tempor</li><li>invidunt ut labore et dolore</li><li>magna aliquyam erat</li><li>sed diam voluptua</li></ul><p>ad fas dasd asasdf asd fasd fasd fas dfasd f sdfasdfda sd as sdgf sdfg sdfg sdfbghtyurty urty urtyu rtyur tasdasqwqwrt wert wert wert wert sdfg sgd. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p>',
        },
        sessions: {
          targetItems: SESSIONS,
        },
      },
    },
  },
} as unknown as SpeakerInformationProps;

const Template: ComponentStory<typeof SpeakerInformationPageHero> = () => {
  return (
    <SitecoreContext componentFactory={mockComponentFactory} layoutData={mockLayoutData}>
      <header>
        <HeaderContent {...mockHeaderProps} />
      </header>
      <main>
        <HeaderCdpMessageBar />
        <SpeakerInformationPageHero {...speakerInformationPageHeroProps} />
        <SpeakerInformation {...speakerInformationProps} />
      </main>
      <footer>
        <Footer {...mockFooterProps} />
      </footer>
    </SitecoreContext>
  );
};

export const Default = Template.bind({});
Default.args = {};
