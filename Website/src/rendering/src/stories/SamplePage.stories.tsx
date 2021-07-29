import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '../components/Header';
import { HeaderProps } from '../components/Header';
import HeroSection, { HeroProps } from '../components/HeroSection';
import MainNavigation from '../components/MainNavigation';
import ThreeColumnsSection, { ThreeColumnsSectionProps } from '../components/ThreeColumnsSection';
import SponsorsGrid, { SponsorsProps } from '../components/SponsorsGrid';

export default {
  title: 'Example/SamplePage',
} as ComponentMeta<typeof HeroSection>;

let headerProps = {} as HeaderProps;
let heroProps = {
  fields: {
    Logo: {
      value: {
        src: '/assets/img/play-logo-wide-light.svg',
      },
    },
    Slogan: {
      value: 'READY | STEADY | PLAY!',
    },
    Expo: {
      value: 'Sports and Leisure Expo',
    },
    Title: {
      value: 'RAISE YOUR GAME',
    },
    Subtitle: {
      value: 'Join us in person or online for the fifth annual PLAY! Summit.',
    },
    When: {
      value: 'August 24th – 25th',
    },
    Link: {
      value: {
        href: '/tickets',
        text: 'Book Tickets',
      },
    },
  },
} as HeroProps;

const sponsor1 = {
  Name: 'Item Name',
  fields: {
    Picture: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
      },
    },
  },
} as Sponsor;

const sponsor2 = {
  Name: 'Item Name',
  fields: {
    Picture: {
      value: {
        src: '/assets/img/sponsors/sponsors-sports.svg',
      },
    },
  },
} as Sponsor;

const sponsor3 = {
  Name: 'Item Name',
  fields: {
    Picture: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
      },
    },
  },
} as Sponsor;

let sponsorProps = {
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

let threeColProps = {
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
        href: '/schedule',
        text: 'View Schedule',
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
        text: 'View Speackers',
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

const Template: ComponentStory<typeof HeroSection> = () => {
  return (
    <>
      <div className="header">
        <Header {...headerProps} />
        <MainNavigation />
      </div>
      <HeroSection {...heroData} />
      <ThreeColumnsSection {...threeColProps} />
      <SponsorsGrid {...sponsorProps} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
