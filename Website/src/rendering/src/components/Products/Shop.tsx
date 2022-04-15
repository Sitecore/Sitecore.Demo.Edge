import { PropsWithChildren, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ShopNavigation from '../Navigation/ShopNavigation';
import Footer, { FooterProps } from '../Navigation/Footer';
import HeaderCdpMessageBar from '../HeaderCdpMessageBar';
import { isCommerceEnabled } from '../../helpers/CommerceHelper';
import { MerchandisingScripts } from '../../services/MerchandisingService';
import { Provider } from 'react-redux';
import reduxStore from '../../redux/store';
import OcProvider from '../../redux/ocProvider';
import { PageController } from '@sitecore-discover/react';
import '../../../public/discover';

export const ShopLayout = (props: PropsWithChildren<unknown>): JSX.Element => {
  useEffect(() => {
    PageController.getContext().setPageUri(window.location.pathname);
    console.log('USING DISCOVER PAGE CONTROLLER FROM SHOP.TSX');
  }, []);

  const shopNavigationProps = {
    fields: {
      data: {
        item: {
          headerLogo: {
            jsonValue: {
              value: {
                // TODO update with play shop logo when available
                src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/83a458a1cb54401cab2308488bbd1031?v=bdb6447b&t=web',
              },
            },
            alt: '',
          },
        },
      },
    },
  } as ShopNavigationProps;

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

      {/* {MerchandisingScripts} */}

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

export const Product = (props: ProductProps): JSX.Element => (
  <div className="product">
    <Link href={`/shop/products/${props.sku}`}>
      <a>
        <img className="product-image" src={props.image_url} alt="Product image" />
        <div className="product-details">
          <b>{props.name || 'Product Name'}</b>
          <p>{props.vendor || 'Vendor Name'}</p>
          <p>${props.price}</p>
        </div>
      </a>
    </Link>
  </div>
);

// Interfaces

export interface ProductProps {
  image_url: string;
  price: number;
  name?: string;
  vendor?: string;
  sku: string;
}
