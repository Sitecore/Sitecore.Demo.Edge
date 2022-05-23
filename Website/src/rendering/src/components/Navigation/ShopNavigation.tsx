import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import MiniCart from '../Checkout/MiniCart';
import CartBadge from '../ShopCommon/CartBadge';
import DiscoverWidget from '../ShopCommon/DiscoverWidget';
import PreviewSearch, { PreviewSearchProps } from '../PreviewSearch/PreviewSearch';
import { isAuthenticationEnabled } from '../../services/AuthenticationService';
import ClickOutside from '../ShopCommon/ClickOutside';

export type ShopNavigationProps = {
  previewSearchProps?: PreviewSearchProps; // For Storybook support
};

const ShopNavigation = (props: ShopNavigationProps): JSX.Element => {
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const miniCartRef = useRef(null);

  const accountMenuItem = isAuthenticationEnabled && (
    <li className="shop-navigation-menu-item">
      <Link href="/account" passHref>
        <a>
          <FontAwesomeIcon id="user-icon" icon={faUserCircle} />
        </a>
      </Link>
    </li>
  );

  ClickOutside(miniCartRef, () => {
    setIsMiniCartOpen(false);
  });

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
            {/* TODO: Remove condition from JSX */}
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
              {/* TODO: Remove condition from JSX */}
              <div className={`mini-cart-wrapper ${isMiniCartOpen ? 'open' : ''}`}>
                <MiniCart />
              </div>
            </li>
            {accountMenuItem}
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
