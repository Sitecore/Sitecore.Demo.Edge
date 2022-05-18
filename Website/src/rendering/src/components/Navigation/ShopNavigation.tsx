import Link from 'next/link';
import ImageNext, { ImageLoader, ImageLoaderProps } from 'next/image';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faChevronDown, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import MiniCart from '../Checkout/MiniCart';
import CartBadge from '../ShopCommon/CartBadge';
import DiscoverWidget from '../ShopCommon/DiscoverWidget';
import PreviewSearch, { PreviewSearchProps } from '../PreviewSearch/PreviewSearch';
import ClickOutside from '../ShopCommon/ClickOutside';

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
  const miniCartRef = useRef(null);

  ClickOutside(miniCartRef, () => {
    setIsMiniCartOpen(false);
  });

  const flagLoader: ImageLoader = ({ src }: ImageLoaderProps): string => {
    return src;
  };

  const previewSearchWidget = props.previewSearchProps ? (
    <PreviewSearch {...props.previewSearchProps} />
  ) : (
    <DiscoverWidget rfkId="rfkid_6" />
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
            <li
              className={`shop-navigation-menu-item cart-menu-item ${
                isMiniCartOpen ? 'active' : ''
              }`}
              ref={miniCartRef}
            >
              <button onClick={() => setIsMiniCartOpen(!isMiniCartOpen)}>
                <FontAwesomeIcon id="cart-icon" icon={faShoppingCart} />
                <CartBadge />
              </button>
              <div className={`mini-cart-wrapper ${isMiniCartOpen ? 'open' : ''}`}>
                <MiniCart />
              </div>
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
          <div id="search-input-container">{previewSearchWidget}</div>
        </div>
      </div>
    </nav>
  );
};

export default ShopNavigation;
