import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Header, { HeaderProps } from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import HeroSectionCta from '../../components/HeroSectionCta';
import MainNavigation, { MainNavigationProps } from '../../components/MainNavigation';
import Shop from '../../pages/shop';

export default {
  title: 'Pages/Shop Landing Page',
} as ComponentMeta<typeof HeroSection>;

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
        <Shop />
      </main>
    </SitecoreContext>
  );
};

export const Default = Template.bind({});
Default.args = {};
