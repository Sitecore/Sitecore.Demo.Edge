import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '../../components/Navigation/Header';
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
import { UserProvider } from '@auth0/nextjs-auth0';

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
        src: 'https://demoedge.sitecoresandbox.cloud/api/public/content/fddf681166144085b1aa1bef893fca9b?v=df31289a&t=profile',
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
    Description: {
      value:
        '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.&nbsp;</p><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p><ul><li>Lorem ipsum dolor sit amet</li><li>consetetur sadipscing elitr</li><li>sed diam nonumy eirmod tempor</li><li>invidunt ut labore et dolore</li><li>magna aliquyam erat</li><li>sed diam voluptua</li></ul><p>Ad fas dasd asasdf asd fasd fasd fas dfasd f sdfasdfda sd as sdgf sdfg sdfg sdfbghtyurty urty urtyu rtyur tasdasqwqwrt wert wert wert wert sdfg sgd. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p>',
    },
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
} as VendorInformationProps;

const Template: ComponentStory<typeof VendorInformationPageHero> = () => {
  return (
    <UserProvider>
      <SitecoreContext componentFactory={mockComponentFactory}>
        <header>
          <Header {...mockHeaderProps} />
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
    </UserProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
