import { PropsWithChildren, useEffect } from 'react';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import ShopNavigation from '../Navigation/ShopNavigation';
import Footer, { FooterProps } from '../Navigation/Footer';
import HeaderCdpMessageBar from '../HeaderCdpMessageBar';
import { isCommerceEnabled } from '../../helpers/CommerceHelper';
import { Provider } from 'react-redux';
import reduxStore from '../../redux/store';
import OcProvider from '../../redux/ocProvider';
import { initialize as initializeDiscover } from '../../services/DiscoverService';
import { trackViewEvent } from '../../services/TrackingService';
import { initialize as initializeSend } from '../../services/SendService';

export const ShopLayout = (props: PropsWithChildren<unknown>): JSX.Element => {
  initializeDiscover();

  useEffect(() => {
    // Initialize Sitecore Send
    initializeSend();

    trackViewEvent();
    // Log a page view on route change
    const pushState = history.pushState;
    history.pushState = (...rest) => {
      pushState.apply(history, rest);
      trackViewEvent();
    };
  }, []);

  const footerProps = {
    fields: {
      data: {
        item: {
          footerLogo: {},
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
                displayName: 'PLAY! Summit',
                children: {
                  results: [
                    {
                      displayName: 'Home',
                      icon: { value: '' },
                      title: { value: '' },
                      field: {
                        jsonValue: {
                          value: {
                            href: '/en',
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
  } as unknown as FooterProps;

  // Show shop content if commerce is enabled, otherwise show error message
  const shopContent = isCommerceEnabled ? (
    <UserProvider>
      <Provider store={reduxStore}>
        <OcProvider>
          <header>
            <ShopNavigation />
          </header>
          <main>
            <HeaderCdpMessageBar />
            <div className="shop-main-container">{props.children}</div>
          </main>
        </OcProvider>
      </Provider>
    </UserProvider>
  ) : (
    <p className="shop-integration-error">
      Shop pages are currently disabled because the commerce integration is not configured
    </p>
  );

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {shopContent}
      <footer>
        <Footer {...footerProps} />
      </footer>
    </>
  );
};
