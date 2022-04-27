import Link from 'next/link';
import ImageNext, { ImageLoader, ImageLoaderProps } from 'next/image';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faChevronDown, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import MiniCart from '../Checkout/MiniCart';
import CartBadge from '../ShopCommon/CartBadge';
import IfCommerceEnabled from '../ShopCommon/IfCommerceEnabled';
import { Widget } from '@sitecore-discover/react';
import PreviewSearch, { PreviewSearchProps } from '../PreviewSearch/PreviewSearch';

export type ShopNavigationProps = {
  previewSearchProps?: PreviewSearchProps; // For Storybook support
};

const ShopNavigation = (props: ShopNavigationProps): JSX.Element => {
  // TODO update setLocale, setFlagUrl later on when possible to select locale from dropdown
  const [locale /*, setLocale */] = useState('EN / CAD');
  const [flagUrl /*, setFlagUrl */] = useState(
    'https://emojipedia-us.s3.amazonaws.com/source/skype/289/flag-canada_1f1e8-1f1e6.png'
  );
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const flagLoader: ImageLoader = ({ src }: ImageLoaderProps): string => {
    return src;
  };

  const previewSearchWidget = props.previewSearchProps ? (
    <PreviewSearch {...props.previewSearchProps} />
  ) : (
    <Widget rfkId="rfkid_6" />
  );

  return (
    <nav className="shop-navigation">
      <div className="shop-container shop-navigation-content">
        <div className="logo-container">
          <Link href="/shop">
            <a className="logo-link">
              <img src="/assets/img/shop/play-shop-logo.svg" alt="PLAY! SHOP" />
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
            <li className={`shop-navigation-menu-item ${isMiniCartOpen ? 'active' : ''}`}>
              <button onClick={() => setIsMiniCartOpen(!isMiniCartOpen)}>
                <FontAwesomeIcon id="cart-icon" icon={faShoppingCart} />
                <IfCommerceEnabled>
                  <CartBadge />
                </IfCommerceEnabled>
              </button>
            </li>
            <div className={`mini-cart-wrapper ${isMiniCartOpen ? 'open' : ''}`}>
              <IfCommerceEnabled>
                <MiniCart />
              </IfCommerceEnabled>
            </div>
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
          <div id="search-input-container">{previewSearchWidget}</div>
        </div>
      </div>
    </nav>
  );
};

export default ShopNavigation;
