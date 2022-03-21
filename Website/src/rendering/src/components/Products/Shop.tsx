import { PropsWithChildren, ReactElement, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShopNavigation, { ShopNavigationProps } from '../Navigation/ShopNavigation';
import Footer, { FooterProps } from '../Navigation/Footer';
import HeaderCdpMessageBar from '../HeaderCdpMessageBar';

export const ShopLayout = (props: PropsWithChildren<unknown>): JSX.Element => {
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

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <ShopNavigation {...shopNavigationProps} />
      </header>
      <main>
        <HeaderCdpMessageBar />
        <div className="shop-container">{props.children}</div>
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </>
  );
};

export const ProductSearchBar = (props: SearchBarProps): JSX.Element => {
  const [popupVisible, setpopupVisible] = useState(false);
  return (
    <div data-rfkid="rfkid_6" id="search-input-container">
      <FontAwesomeIcon id="search-icon" icon={faSearch} />
      <input
        id="search-input"
        onFocus={() => setpopupVisible(true)}
        onBlur={() => setpopupVisible(false)}
        placeholder="I am shopping for..."
      ></input>
      <Popup visible={popupVisible}>
        <ReflektionContent {...props.reflektionProps} />
      </Popup>
    </div>
  );
};

export const Popup = (props: PopupProps): JSX.Element => {
  return props.visible ? <div id="popup-container">{props.children}</div> : <></>;
};

export const ReflektionContent = (props: ReflektionContentProps): JSX.Element => {
  return props?.products ? (
    <div id="reflektion-container">
      <div id="reflektion-left-container">
        <ul>
          <li>Did you mean?</li>
          {props.didYouMean?.map((text) => (
            <li key={text}>
              <a href="#">{text}</a>
            </li>
          ))}
        </ul>
        <ul>
          <li>Top categories</li>
          {props.topCategories?.map((text) => (
            <li key={text}>
              <a href="#">{text}</a>
            </li>
          ))}
        </ul>
      </div>
      <div id="reflektion-right-container">
        {props.products?.map((product) => (
          <Product
            key={product.image_url}
            image_url={product.image_url}
            price={product.price}
            sku={product.sku}
          />
        ))}
      </div>
    </div>
  ) : null;
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

export interface PopupProps {
  children: ReactElement;
  visible: boolean;
}

export interface ReflektionContentProps {
  products?: ProductProps[];
  didYouMean?: string[];
  topCategories?: string[];
}

export interface SearchBarProps {
  reflektionProps?: ReflektionContentProps;
}
