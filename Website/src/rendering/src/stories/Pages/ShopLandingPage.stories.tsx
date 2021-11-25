import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Footer, { FooterProps } from '../../components/Footer';
import Header, { HeaderProps } from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import HeroSectionCta from '../../components/HeroSectionCta';
import MainNavigation, { MainNavigationProps } from '../../components/MainNavigation';
import Shop, { ShopProps } from '../../pages/shop';

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

const shopProps = {
  categoryProps: {
    categories: [
      {
        categoryName: 'Workout',
        imageUrl: '/assets/img/shop/demo/shutterstock_276857315.png',
      },
      {
        categoryName: 'Golf',
        imageUrl: '/assets/img/shop/demo/shutterstock_276857315-1.png',
      },
      {
        categoryName: 'Mountain bike',
        imageUrl: '/assets/img/shop/demo/shutterstock_276857315-2.png',
      },
      {
        categoryName: 'Yoga',
        imageUrl: '/assets/img/shop/demo/shutterstock_276857315-3.png',
      },
    ],
  },
  productProps: {
    products: [
      {
        imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
        price: 255.99,
      },
      {
        imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
        price: 255.99,
      },
      {
        imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
        price: 255.99,
      },
    ],
  },
  vendorProps: {
    vendorImageUrls: [
      '/assets/img/shop/demo/RunRightThrough.png',
      '/assets/img/shop/demo/Striva.png',
      '/assets/img/shop/demo/SyndeyCummings.png',
      '/assets/img/shop/demo/RunRightThrough-1.png',
      '/assets/img/shop/demo/Striva-1.png',
      '/assets/img/shop/demo/SyndeyCummings-1.png',
    ],
  },
} as ShopProps;

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
        <Shop {...shopProps} />
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </SitecoreContext>
  );
};

export const Default = Template.bind({});
Default.args = {};
