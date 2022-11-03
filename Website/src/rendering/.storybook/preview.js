import React from 'react';
import { SitecoreContextReactContext, LayoutServicePageState } from '@sitecore-jss/sitecore-jss-nextjs';
import "../src/assets/css/abstracts/mixins.css";
import "../src/assets/css/main.css";
import * as nextImage from 'next/image';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  breakpoints: {
    breakpointNames: {
      'default': '0',
      'sm': '640',
      'md': '768',
      'lg': '1024',
      'xl': '1280',
      '2xl': '1536',
    },
    debounceTimeout: 200,
  },
}

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: props => <img {...props} />
});

export const mockLayoutData = {
  sitecore: {
    context: {
      pageEditing: false,
      pageState: LayoutServicePageState.Normal,
      Languages: [
        {
          Name: 'en',
        },
        {
          Name: 'en-US',
        },
        {
          Name: 'fr',
        },
        {
          Name: 'fr-CA',
        },
        {
          Name: 'es-ES',
        },
        {
          Name: 'ja-JP',
        },
      ],
    },
    setContext: () => {
      // nothing
    },
    route: null,
  },
};

export const decorators = [
  (Story) => (
    <SitecoreContextReactContext.Provider value={mockLayoutData.sitecore}>
      <Story />
    </SitecoreContextReactContext.Provider>
  ),
];
