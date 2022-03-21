import { HeaderProps } from '../../components/Navigation/Header';
import { FooterProps } from '../../components/Navigation/Footer';
import HeroSectionCta from '../../components/PageContent/HeroSectionCta';
import MainNavigation from '../../components/Navigation/MainNavigation';

export const mockHeaderProps = {
  rendering: {
    placeholders: {
      'jss-header-content': [
        {
          uid: '04d6b23e-6ce3-51a1-9c9c-4cd56b29b6aa',
          componentName: 'MainNavigation',
          dataSource: '',
          params: {},
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
        },
      ],
    },
    dataSource: '/sitecore',
  },
} as unknown as HeaderProps;

export const mockFooterProps = {
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
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
} as FooterProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockComponentFactory = function (componentName: string): any {
  const components = new Map();
  components.set('HeroSectionCta', HeroSectionCta);
  components.set('MainNavigation', MainNavigation);

  const component = components.get(componentName);

  // check that component should be dynamically imported
  if (component?.element) {
    // return next.js dynamic import
    return component.element();
  }

  return component?.default || component;
};
