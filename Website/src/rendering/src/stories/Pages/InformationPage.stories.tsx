import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header, { HeaderProps } from '../../components/Header';
import MainNavigation, { MainNavigationProps } from '../../components/MainNavigation';
import InformationPageHero, {
  InformationPageHeroProps,
} from '../../components/InformationPageHero';
import TicketGrid from '../../components/TicketGrid';
import VendorInformation, { VendorInformationProps } from '../../components/VendorInformation';
import Footer, { FooterProps } from '../../components/Footer';

export default {
  title: 'Pages/Information',
} as ComponentMeta<typeof InformationPageHero>;

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

const informationPageHeroProps = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Image: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
        height: 133,
        width: 600,
      },
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
  type: 'vendor',
  qualificative: 'Featured',
} as InformationPageHeroProps;

const vendorInformationProps = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Level: {
      value: 'Featured',
    },
    Logo: {
      value: {
        src: '/assets/img/aboutus/fitbit-logo.png',
      },
    },
    Description: {
      value:
        '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.&nbsp;</p><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p><ul><li>Lorem ipsum dolor sit amet</li><li>consetetur sadipscing elitr</li><li>sed diam nonumy eirmod tempor</li><li>invidunt ut labore et dolore</li><li>magna aliquyam erat</li><li>sed diam voluptua</li></ul><p>ad fas dasd asasdf asd fasd fasd fas dfasd f sdfasdfda sd as sdgf sdfg sdfg sdfbghtyurty urty urtyu rtyur tasdasqwqwrt wert wert wert wert sdfg sgd. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p>',
    },
  },
} as VendorInformationProps;

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

const Template: ComponentStory<typeof InformationPageHero> = () => {
  return (
    <>
      <header>
        <Header {...headerProps} />
        <MainNavigation {...mainNavigationArgs} />
      </header>
      <main>
        <InformationPageHero {...informationPageHeroProps} />
        <TicketGrid />
        <VendorInformation {...vendorInformationProps} />
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
