import { HeaderProps } from '../../components/Navigation/Header';
import { FooterProps } from '../../components/Navigation/Footer';
import HeroSectionCta from '../../components/PageContent/HeroSectionCta';
import MainNavigation from '../../components/Navigation/MainNavigation';

export const mockMainNavigationFields = {
  data: {
    item: {
      headerLogo: {
        jsonValue: {
          value: {
            src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/83a458a1cb54401cab2308488bbd1031?v=bdb6447b\u0026t=web',
            height: '113',
            width: '274',
          },
        },
        alt: 'PLAY! Summit logo - stacked light grey',
      },
    },
    links: {
      displayName: 'Main Navigation',
      children: {
        results: [
          {
            displayName: 'Sessions',
            field: {
              jsonValue: {
                value: {
                  href: '/en/sessions',
                  text: '',
                  anchor: '',
                  linktype: 'internal',
                  class: '',
                  title: '',
                  target: '',
                  querystring: '',
                  id: '{68DC89A4-1B04-59A8-9C4E-3B49D6C61052}',
                },
              },
            },
          },
          {
            displayName: 'Speakers',
            field: {
              jsonValue: {
                value: {
                  href: '/en/speakers',
                  text: '',
                  anchor: '',
                  linktype: 'internal',
                  class: '',
                  title: '',
                  target: '',
                  querystring: '',
                  id: '{1F4B781B-F2A5-5647-99DF-C0C369162C4D}',
                },
              },
            },
          },
          {
            displayName: 'Vendors',
            field: {
              jsonValue: {
                value: {
                  href: '/en/vendors',
                  text: '',
                  anchor: '',
                  linktype: 'internal',
                  class: '',
                  title: '',
                  target: '',
                  querystring: '',
                  id: '{774E44E8-0F30-5879-B847-AD233FFB41AA}',
                },
              },
            },
          },
          {
            displayName: 'Sponsors',
            field: {
              jsonValue: {
                value: {
                  href: '/en/sponsors',
                  text: '',
                  anchor: '',
                  linktype: 'internal',
                  class: '',
                  title: '',
                  target: '',
                  querystring: '',
                  id: '{66C99E47-7BBF-52D1-B1D7-4662B850744A}',
                },
              },
            },
          },
          {
            displayName: 'About Us',
            field: {
              jsonValue: {
                value: {
                  href: '/en/about-us',
                  text: '',
                  anchor: '',
                  linktype: 'internal',
                  class: '',
                  title: '',
                  target: '',
                  querystring: '',
                  id: '{2717574C-48A0-5469-85A8-A332DF71F1E4}',
                },
              },
            },
          },
        ],
      },
    },
  },
};

export const mockHeaderProps = {
  fields: {
    data: {
      item: {
        children: {
          results: [
            {
              displayName: 'Link 1',
              field: {
                jsonValue: {
                  value: {
                    href: '/url1',
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
  rendering: {
    placeholders: {
      'jss-header-content': [
        {
          uid: '04d6b23e-6ce3-51a1-9c9c-4cd56b29b6aa',
          componentName: 'MainNavigation',
          dataSource: '',
          params: {},
          fields: mockMainNavigationFields,
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
              src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/c78f4095acc746a98146aaa38f57a04f?v=85bba949&t=web',
              width: '413',
              height: '113',
            },
          },
          alt: 'PLAY! Summit long light grey',
        },
      },
      links: {
        displayName: 'Footer',
        children: {
          results: [
            {
              displayName: 'Follow Us',
              children: {
                results: [
                  {
                    displayName: 'Facebook',
                    icon: { value: 'faFacebookF' },
                    title: { value: '' },
                    field: {
                      jsonValue: { value: { href: '' } },
                    },
                  },
                  {
                    displayName: 'Youtube',
                    icon: { value: 'faYoutube' },
                    title: { value: '' },
                    field: {
                      jsonValue: { value: { href: '' } },
                    },
                  },
                  {
                    displayName: 'Twitter',
                    icon: { value: 'faTwitter' },
                    title: { value: '' },
                    field: {
                      jsonValue: { value: { href: '' } },
                    },
                  },
                  {
                    displayName: 'Instagram',
                    icon: { value: 'faInstagram' },
                    title: { value: '' },
                    field: {
                      jsonValue: { value: { href: '' } },
                    },
                  },
                  {
                    displayName: 'Linkedin',
                    icon: { value: 'faLinkedin' },
                    title: { value: '' },
                    field: {
                      jsonValue: { value: { href: '' } },
                    },
                  },
                ],
              },
            },
            {
              displayName: 'Pages',
              children: {
                results: [
                  {
                    displayName: 'Sessions',
                    icon: { value: '' },
                    title: { value: '' },
                    field: {
                      jsonValue: {
                        value: {
                          href: '/en/sessions',
                          text: '',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          target: '',
                          querystring: '',
                          id: '{68DC89A4-1B04-59A8-9C4E-3B49D6C61052}',
                        },
                      },
                    },
                  },
                  {
                    displayName: 'Speakers',
                    icon: { value: '' },
                    title: { value: '' },
                    field: {
                      jsonValue: {
                        value: {
                          href: '/en/speakers',
                          text: '',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          target: '',
                          querystring: '',
                          id: '{1F4B781B-F2A5-5647-99DF-C0C369162C4D}',
                        },
                      },
                    },
                  },
                  {
                    displayName: 'Vendors',
                    icon: { value: '' },
                    title: { value: '' },
                    field: {
                      jsonValue: {
                        value: {
                          href: '/en/vendors',
                          text: '',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          target: '',
                          querystring: '',
                          id: '{774E44E8-0F30-5879-B847-AD233FFB41AA}',
                        },
                      },
                    },
                  },
                  {
                    displayName: 'Sponsors',
                    icon: { value: '' },
                    title: { value: '' },
                    field: {
                      jsonValue: {
                        value: {
                          href: '/en/sponsors',
                          text: '',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          target: '',
                          querystring: '',
                          id: '{66C99E47-7BBF-52D1-B1D7-4662B850744A}',
                        },
                      },
                    },
                  },
                  {
                    displayName: 'About Us',
                    icon: { value: '' },
                    title: { value: '' },
                    field: {
                      jsonValue: {
                        value: {
                          href: '/en/about-us',
                          text: '',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          target: '',
                          querystring: '',
                          id: '{2717574C-48A0-5469-85A8-A332DF71F1E4}',
                        },
                      },
                    },
                  },
                  {
                    displayName: 'News',
                    icon: { value: '' },
                    title: { value: '' },
                    field: {
                      jsonValue: {
                        value: {
                          href: '/en/news',
                          text: '',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          target: '',
                          querystring: '',
                          id: '{0E4A63DA-7496-557E-BF80-5BD52255E431}',
                        },
                      },
                    },
                  },
                  {
                    displayName: 'Shop',
                    icon: { value: '' },
                    title: { value: '' },
                    field: {
                      jsonValue: {
                        value: {
                          href: '/shop',
                          text: 'shop',
                          linktype: 'external',
                          url: '/shop',
                          anchor: '',
                          target: '',
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              displayName: 'Join Us',
              children: {
                results: [
                  {
                    displayName: 'Book Tickets',
                    icon: { value: '' },
                    title: { value: '' },
                    field: {
                      jsonValue: { value: { href: '' } },
                    },
                  },
                  {
                    displayName: 'Become a Sponsor',
                    icon: { value: '' },
                    title: { value: '' },
                    field: {
                      jsonValue: { value: { href: '' } },
                    },
                  },
                  {
                    displayName: 'Become a Vendor',
                    icon: { value: '' },
                    title: { value: '' },
                    field: {
                      jsonValue: { value: { href: '' } },
                    },
                  },
                ],
              },
            },
            {
              displayName: 'Get Support',
              children: {
                results: [
                  {
                    displayName: 'FAQ',
                    icon: { value: '' },
                    title: { value: '' },
                    field: {
                      jsonValue: { value: { href: '' } },
                    },
                  },
                  {
                    displayName: 'Tech Support',
                    icon: { value: '' },
                    title: { value: '' },
                    field: {
                      jsonValue: { value: { href: '' } },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
} as unknown as FooterProps;

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
