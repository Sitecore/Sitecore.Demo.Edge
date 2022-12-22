import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeaderContent from '../../components/Navigation/HeaderContent';
import HeaderCdpMessageBar from '../../components/HeaderCdpMessageBar';
import VendorInformationPageHero, {
  VendorInformationPageHeroProps,
} from '../../components/Vendors/VendorInformationPageHero';
import VendorInformation, {
  VendorInformationProps,
} from '../../components/Vendors/VendorInformation';
import Footer from '../../components/Navigation/Footer';
import { mockComponentFactory, mockFooterProps, mockHeaderProps } from './PageStoriesCommon';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { SESSIONS } from '../mock-sessions';
import { mockLayoutData } from '../../../.storybook/preview';

export default {
  title: 'Pages/Vendor Information Page',
} as ComponentMeta<typeof VendorInformationPageHero>;

const vendorInformationPageHeroProps = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Logo: {
      value: {
        src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/cd9887afd5f249c2a77bc62a506ed667?v=6aea2ec4a&t=profile',
        height: 133,
        width: 600,
      },
    },
    Level: {
      value: 'premium',
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
} as unknown as VendorInformationPageHeroProps;

const vendorInformationProps = {
  fields: {
    data: {
      contextItem: {
        description: {
          value:
            '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.&nbsp;</p><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p><ul><li>Lorem ipsum dolor sit amet</li><li>consetetur sadipscing elitr</li><li>sed diam nonumy eirmod tempor</li><li>invidunt ut labore et dolore</li><li>magna aliquyam erat</li><li>sed diam voluptua</li></ul><p>Ad fas dasd asasdf asd fasd fasd fas dfasd f sdfasdfda sd as sdgf sdfg sdfg sdfbghtyurty urty urtyu rtyur tasdasqwqwrt wert wert wert wert sdfg sgd. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p>',
        },
        sessions: {
          targetItems: SESSIONS,
        },
      },
    },
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
} as VendorInformationProps;

const Template: ComponentStory<typeof VendorInformationPageHero> = () => {
  return (
    <SitecoreContext componentFactory={mockComponentFactory} layoutData={mockLayoutData}>
      <header>
        <HeaderContent {...mockHeaderProps} />
      </header>
      <main>
        <HeaderCdpMessageBar />
        <VendorInformationPageHero {...vendorInformationPageHeroProps} />
        <VendorInformation {...vendorInformationProps} />
      </main>
      <footer>
        <Footer {...mockFooterProps} />
      </footer>
    </SitecoreContext>
  );
};

export const Default = Template.bind({});
Default.args = {};
