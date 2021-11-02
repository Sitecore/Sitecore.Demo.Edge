import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header, { HeaderProps } from '../../components/Header';
import MainNavigation, { MainNavigationProps } from '../../components/MainNavigation';
import SpeakerInformationPageHero, {
  SpeakerInformationPageHeroProps,
} from '../../components/SpeakerInformationPageHero';
import SpeakerInformation, { SpeakerInformationProps } from '../../components/SpeakerInformation';
import Footer, { FooterProps } from '../../components/Footer';
import { SESSIONS } from '../../models/mock-sessions';

export default {
  title: 'Pages/Speaker Information Page',
} as ComponentMeta<typeof SpeakerInformationPageHero>;

const headerProps = {} as HeaderProps;

const mainNavigationArgs = {
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
        src: 'https://playsummit.sitecoresandbox.cloud:8443/api/public/content/8f466142f88c4d5c87e29461eddc222f?v=7a63a542',
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

const footerProps = {
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

const Template: ComponentStory<typeof SpeakerInformationPageHero> = () => {
  return (
    <>
      <header>
        <Header {...headerProps} />
        <MainNavigation {...mainNavigationArgs} />
      </header>
      <main>
        <SpeakerInformationPageHero {...speakerInformationPageHeroProps} />
        <SpeakerInformation {...speakerInformationProps} />
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
