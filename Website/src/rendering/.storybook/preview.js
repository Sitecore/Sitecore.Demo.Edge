import React from 'react';
import { SitecoreContextReactContext } from '@sitecore-jss/sitecore-jss-nextjs';
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

export const mockSitecoreContext = {
  context: {
    pageEditing: false,
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
};

export const decorators = [
  (Story) => (
    <SitecoreContextReactContext.Provider value={mockSitecoreContext}>
      <Story />
    </SitecoreContextReactContext.Provider>
  ),
];
