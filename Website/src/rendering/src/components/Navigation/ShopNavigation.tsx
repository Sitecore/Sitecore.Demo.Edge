import Link from 'next/link';
import ImageNext, { ImageLoader, ImageLoaderProps } from 'next/image';
import React, { useEffect, useState } from 'react';
import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faChevronDown, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Widget } from '@sitecore-discover/react';

export type ShopNavigationProps = ComponentProps & {
  fields: {
    data: {
      item: {
        headerLogo: {
          jsonValue: ImageField;
          alt: string;
        };
      };
    };
  };
};

const ShopNavigation = (props: ShopNavigationProps): JSX.Element => {
  // TODO update setLocale, setFlagUrl later on when possible to select locale from dropdown
  const [locale /*, setLocale */] = useState('EN / CAD');
  const [flagUrl /*, setFlagUrl */] = useState(
    'https://emojipedia-us.s3.amazonaws.com/source/skype/289/flag-canada_1f1e8-1f1e6.png'
  );

  const flagLoader: ImageLoader = ({ src }: ImageLoaderProps): string => {
    return src;
  };

  return (
    <nav className="shop-navigation">
      <div className="shop-container shop-navigation-content">
        <div className="logo-container">
          <Link href="/shop">
            <a className="logo-link">
              <Image
                field={props.fields.data.item.headerLogo.jsonValue}
                alt={props.fields.data.item.headerLogo.alt}
                loading="lazy"
              />
            </a>
          </Link>
        </div>
        <div className="items-container">
          <ul>
            <li className="shop-navigation-menu-item locale-picker">
              <ImageNext
                loader={flagLoader}
                src={flagUrl}
                alt="flag"
                width={40}
                height={35}
                unoptimized
              />
              <span>{locale}</span>
              <FontAwesomeIcon id="arrow-down-icon" icon={faChevronDown} />
            </li>
            <li className="shop-navigation-menu-item">
              <Link href="/shop/checkout/cart" passHref>
                <a>
                  <FontAwesomeIcon id="cart-icon" icon={faShoppingCart} />
                </a>
              </Link>
            </li>
            <li className="shop-navigation-menu-item">
              <Link href="/account/login" passHref>
                <a>
                  <FontAwesomeIcon id="user-icon" icon={faUserCircle} />
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="shop-search-input-container">
          <div id="search-input-container">
            <Widget rfkId="rfkid_6" />
          </div>
          {/* <Widget rfkId="rfkid_6" /> */}
        </div>
      </div>
    </nav>
  );
};

export default ShopNavigation;
