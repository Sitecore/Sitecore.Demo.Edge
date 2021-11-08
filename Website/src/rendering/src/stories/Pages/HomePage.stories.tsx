import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '../../components/Header';
import { HeaderProps } from '../../components/Header';
import HeroSection, { HeroProps } from '../../components/HeroSection';
import HeroSectionCta from '../../components/HeroSectionCta';
import MainNavigation, { MainNavigationProps } from '../../components/MainNavigation';
import ThreeColumnsSection, {
  ThreeColumnsSectionProps,
} from '../../components/ThreeColumnsSection';
import SponsorsGrid, { SponsorsProps } from '../../components/SponsorsGrid';
import Footer, { FooterProps } from '../../components/Footer';
import { Sponsor } from 'src/types/sponsor';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

export default {
  title: 'Pages/Home Page',
} as ComponentMeta<typeof HeroSection>;

const headerProps = {} as HeaderProps;
const heroProps = {
  fields: {
    Hero: {
      value: {
        src: 'https://demoedge.sitecoresandbox.cloud/api/public/content/95619f8c034947a2aa2ce5b39146ccf5?v=c63ff08e',
      },
    },
    Slogan: {
      value: 'READY | STEADY | PLAY!',
    },
    Eyebrow: {
      value: 'Sports and Recreation Expo',
    },
    Title: {
      value: 'RAISE YOUR GAME',
    },
    Body: {
      value: 'Join us in person or online for the fifth annual PLAY! Summit.',
    },
  },
  rendering: {
    placeholders: {
      'jss-summit-hero-cta': [
        {
          uid: '04d6b23e-6ce3-51a1-9c9c-4cd56b29b6aa',
          componentName: 'HeroSectionCta',
          dataSource: '',
          params: {},
          fields: {
            Link: {
              value: {
                href: '/tickets',
                text: 'Book Tickets',
              },
            },
          },
        },
      ],
    },
  },
} as unknown as HeroProps;

const sponsor1 = {
  Name: 'Item Name',
  fields: {
    Name: {
      value: '',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
      },
    },
  },
} as Sponsor;

const sponsor2 = {
  Name: 'Item Name',
  fields: {
    Name: {
      value: '',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-sports.svg',
      },
    },
  },
} as Sponsor;

const sponsor3 = {
  Name: 'Item Name',
  fields: {
    Name: {
      value: '',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
      },
    },
  },
} as Sponsor;

const sponsorProps = {
  fields: {
    Title: {
      value: '',
    },
    Subtitle: {
      value: '',
    },
    Sponsors: [sponsor1, sponsor2, sponsor3],
  },
} as SponsorsProps;

const threeColProps = {
  fields: {
    Title: {
      value: 'GO THE DISTANCE',
    },
    Subtitle: {
      value:
        'Whether you’re joining us in person or online, this year’s PLAY! Summit is set to be our biggest and best event yet. Look forward to an action-packed line-up featuring keynotes, Q&As, demos, and workshops across a mix of live and virtual stages.',
    },
    LeftLogo: {
      value: {
        src: '/assets/img/headline-icon-schedule.svg',
      },
    },
    LeftTitle: {
      value: '48 Talks and Workshops',
    },
    LeftLink: {
      value: {
        href: '/sessions',
        text: 'View Sessions',
      },
    },
    MiddleLogo: {
      value: {
        src: '/assets/img/headline-icon-speakers.svg',
      },
    },
    MiddleTitle: {
      value: '32 Speakers and Guest Speakers',
    },
    MiddleLink: {
      value: {
        href: '/speakers',
        text: 'View Speakers',
      },
    },
    RightLogo: {
      value: {
        src: '/assets/img/headline-icon-vendors.svg',
      },
    },
    RightTitle: {
      value: '60 Vendors with VIP Products',
    },
    RightLink: {
      value: {
        href: '/vendors',
        text: 'View Vendors',
      },
    },
  },
} as ThreeColumnsSectionProps;

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

const componentFactory = function (componentName: string) {
  const components = new Map();
  components.set('HeroSectionCta', HeroSectionCta);

  const component = components.get(componentName);

  // check that component should be dynamically imported
  if (component?.element) {
    // return next.js dynamic import
    return component.element();
  }

  return component?.default || component;
};

const Template: ComponentStory<typeof HeroSection> = () => {
  return (
    <SitecoreContext componentFactory={componentFactory}>
      <header>
        <Header {...headerProps} />
        <MainNavigation {...mainNavigationArgs} />
      </header>
      <main>
        <HeroSection {...heroProps} />
        <ThreeColumnsSection {...threeColProps} />
        <SponsorsGrid {...sponsorProps} />
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </SitecoreContext>
  );
};

export const Default = Template.bind({});
Default.args = {};
