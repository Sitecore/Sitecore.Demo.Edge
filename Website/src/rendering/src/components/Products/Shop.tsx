import { PropsWithChildren } from 'react';
import Head from 'next/head';
import ShopNavigation from '../Navigation/ShopNavigation';
import Footer, { FooterProps } from '../Navigation/Footer';
import HeaderCdpMessageBar from '../HeaderCdpMessageBar';
import { isCommerceEnabled } from '../../helpers/CommerceHelper';
import { Provider } from 'react-redux';
import reduxStore from '../../redux/store';
import OcProvider from '../../redux/ocProvider';
import { DiscoverService } from '../../services/DiscoverService';

DiscoverService();

export const ShopLayout = (props: PropsWithChildren<unknown>): JSX.Element => {
  const footerProps = {
    fields: {
      data: {
        item: {
          footerLogo: {
            jsonValue: {
              value: {
                src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/c78f4095acc746a98146aaa38f57a04f?v=85bba949&t=web',
                width: 413,
                height: 113,
              },
            },
            alt: '',
          },
        },
      },
    },
  } as unknown as FooterProps;

  // Show shop content if commerce is enabled, otherwise show error message
  const shopContent = isCommerceEnabled ? (
    <Provider store={reduxStore}>
      <OcProvider>
        <div className="shop-main-container">{props.children}</div>
      </OcProvider>
    </Provider>
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
      <header>
        <ShopNavigation />
      </header>
      <main>
        <HeaderCdpMessageBar />
        {shopContent}
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </>
  );
};
