import Link from 'next/link';
import ImageNext, { ImageLoader, ImageLoaderProps } from 'next/image';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faChevronDown, faUserCircle } from '@fortawesome/free-solid-svg-icons';
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
              <svg
                id="Group_143"
                data-name="Group 143"
                xmlns="http://www.w3.org/2000/svg"
                width="386.18"
                height="220"
                viewBox="0 0 386.18 220"
              >
                <g id="Group_34" data-name="Group 34" transform="translate(117.18)">
                  <text
                    id="PLAY_SHOP"
                    data-name="PLAY! SHOP"
                    transform="translate(0 101)"
                    fill="#006ef9"
                    fontSize="89"
                    fontFamily="Saira-Bold, Saira"
                    fontWeight="700"
                  >
                    <tspan x="0" y="0">
                      PLAY!
                    </tspan>
                    <tspan y="0" fill="#fff">
                      {' '}
                    </tspan>
                    <tspan fill="#fff" fontFamily="Saira-Regular, Saira" fontWeight="400">
                      <tspan x="0" y="80">
                        SHOP
                      </tspan>
                    </tspan>
                  </text>
                </g>
                <g id="Group_9" data-name="Group 9" transform="translate(0 58.052)">
                  <path
                    id="Path_16"
                    data-name="Path 16"
                    d="M65.8,171.371,41.68,146.659V67.788L65.8,57.648Z"
                    transform="translate(-41.68 -56.215)"
                    fill="#ff1887"
                  />
                  <path
                    id="Path_17"
                    data-name="Path 17"
                    d="M158.358,83.266l-10.23,24.181L96.489,54.928h33.533Z"
                    transform="translate(-67.606 -54.928)"
                    fill="#1c80ff"
                  />
                  <path
                    id="Path_18"
                    data-name="Path 18"
                    d="M95.761,159.873V133.366l33.731-14.078,18.291,18.6Z"
                    transform="translate(-67.262 -85.371)"
                    fill="#ff8d00"
                  />
                  <path
                    id="Path_19"
                    data-name="Path 19"
                    d="M87.437,57.648l18.291,18.6L87.443,83.927Z"
                    transform="translate(-63.324 -56.215)"
                    fill="#ffd41c"
                  />
                </g>
              </svg>
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
          <div id="search-input-container">{previewSearchWidget}</div>
        </div>
      </div>
    </nav>
  );
};

export default ShopNavigation;
